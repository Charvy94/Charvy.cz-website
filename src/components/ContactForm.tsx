import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name max 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email max 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message max 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  variant?: 'photo' | 'workshop' | 'blog' | 'ttrpg';
  subject?: string;
  apiEndpoint?: string;
}

// API base URL for PHP backend
const API_BASE_URL = 'https://charvy.cz/php-backend';

export function ContactForm({ variant = 'photo', subject = 'Nová zpráva z webu', apiEndpoint }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          subject: subject
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: t('contactForm.success'),
          description: t('contactForm.successDesc'),
        });
        reset();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('contactForm.error'),
        description: t('contactForm.errorDesc'),
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
          placeholder="Vaše zpráva..."
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
            {t('contactForm.sending')}
          </>
        ) : (
          t('contactForm.submit')
        )}
      </Button>
    </form>
  );
}
