import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { ContactApiError, sendContactMessage } from '@/services/contactApi';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Jméno musí mít alespoň 2 znaky' }).max(100, { message: 'Jméno může mít maximálně 100 znaků' }),
  email: z.string().trim().email({ message: 'Neplatná e-mailová adresa' }).max(255, { message: 'E-mail může mít maximálně 255 znaků' }),
  message: z.string().trim().min(10, { message: 'Zpráva musí mít alespoň 10 znaků' }).max(2000, { message: 'Zpráva může mít maximálně 2000 znaků' }),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  variant?: 'photo' | 'workshop' | 'blog' | 'ttrpg';
  subject?: string;
}

export function ContactForm({ variant = 'photo', subject = 'Nová zpráva z webu' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { toast } = useToast();
  const formStartedAt = useMemo(() => Math.floor(Date.now() / 1000), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    clearErrors('root.serverError');

    try {
      const response = await sendContactMessage({
        name: data.name,
        email: data.email,
        message: data.message,
        subject,
        website: data.website,
        formStartedAt,
      });

      const successMessage = response.message || 'Zpráva byla odeslána. Brzy se ozveme.';
      setSubmitSuccess(successMessage);
      toast({
        title: 'Úspěch!',
        description: successMessage,
      });

      reset({
        name: '',
        email: '',
        message: '',
        website: '',
      });
    } catch (error) {
      if (error instanceof ContactApiError && error.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          if (field === 'name' || field === 'email' || field === 'message') {
            setError(field, { type: 'server', message });
          }
        });
      }

      const errorMessage = error instanceof Error ? error.message : 'Něco se pokazilo. Zkuste to prosím znovu.';
      setError('root.serverError', { type: 'server', message: errorMessage });

      toast({
        title: 'Chyba',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl" noValidate>
      {submitSuccess && (
        <div className="rounded-md border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-700">
          {submitSuccess}
        </div>
      )}

      {errors.root?.serverError?.message && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {errors.root.serverError.message}
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Jméno *
        </label>
        <Input
          id="name"
          {...register('name')}
          className="w-full"
          placeholder="Vaše jméno"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-destructive text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-mail *
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="w-full"
          placeholder="vas@email.cz"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-destructive text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Zpráva *
        </label>
        <Textarea
          id="message"
          {...register('message')}
          className="w-full min-h-[150px]"
          placeholder="Popište, co byste si přáli vyrobit..."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-destructive text-sm mt-1" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant={variant}
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Odesílání...
          </>
        ) : (
          'Odeslat zprávu'
        )}
      </Button>
    </form>
  );
}
