import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { contactApi } from '@/services/contactApi';
import { Loader2 } from 'lucide-react';

interface ContactFormProps {
  variant?: 'photo' | 'workshop' | 'blog' | 'ttrpg';
  subject?: string;
}

export function ContactForm({ variant = 'photo', subject }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const contactSchema = z.object({
    name: z.string().trim().min(1, { message: t('form.nameRequired') }).max(100, { message: t('form.nameMaxLength') }),
    email: z.string().trim().email({ message: t('form.emailInvalid') }).max(255, { message: t('form.emailMaxLength') }),
    message: z.string().trim().min(1, { message: t('form.messageRequired') }).max(1000, { message: t('form.messageMaxLength') })
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await contactApi.sendMessage({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: subject || t('workshop.orderTitle'),
      });
      
      toast({
        title: t('form.success'),
        description: t('form.successMessage'),
      });
      
      reset();
    } catch (error) {
      toast({
        title: t('form.error'),
        description: t('form.errorMessage'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t('form.name')} *
        </label>
        <Input
          id="name"
          {...register('name')}
          className="w-full"
          placeholder={t('form.namePlaceholder')}
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
          {t('form.email')} *
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="w-full"
          placeholder={t('form.emailPlaceholder')}
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
          {t('form.message')} *
        </label>
        <Textarea
          id="message"
          {...register('message')}
          className="w-full min-h-[150px]"
          placeholder={t('form.messagePlaceholder')}
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
            {t('form.sending')}
          </>
        ) : (
          t('form.submit')
        )}
      </Button>
    </form>
  );
}
