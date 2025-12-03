import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser, loginUser } from '@/services/authApi';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Auth() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.username.length < 3) {
      newErrors.username = t('auth.errorUsernameShort');
    }
    
    if (!isLoginMode) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('auth.errorEmailInvalid');
      }
      
      if (formData.password.length < 8) {
        newErrors.password = t('auth.errorPasswordShort');
      } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
        newErrors.password = t('auth.errorPasswordWeak');
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('auth.errorPasswordMismatch');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLoginMode) {
        const result = await loginUser({
          username: formData.username,
          password: formData.password,
        });
        
        login({ userID: result.userID!, username: formData.username });
        
        toast({
          title: t('auth.loginSuccess'),
          description: t('auth.welcomeBack'),
        });
        
        navigate('/dashboard');
      } else {
        await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        
        toast({
          title: t('auth.registerSuccess'),
          description: t('auth.pleaseLogin'),
        });
        
        setIsLoginMode(true);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      toast({
        title: isLoginMode ? t('auth.loginFailed') : t('auth.registerFailed'),
        description: error instanceof Error ? error.message : t('auth.unknownError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <SEO 
        title={isLoginMode ? t('auth.loginTitle') : t('auth.registerTitle')}
        description={t('auth.description')}
      />
      
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isLoginMode ? t('auth.login') : t('auth.register')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">{t('auth.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder={t('auth.usernamePlaceholder')}
                  disabled={isLoading}
                  className={errors.username ? 'border-destructive' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-destructive mt-1">{errors.username}</p>
                )}
              </div>
              
              {!isLoginMode && (
                <div>
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    disabled={isLoading}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
              )}
              
              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={t('auth.passwordPlaceholder')}
                    disabled={isLoading}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
              </div>
              
              {!isLoginMode && (
                <div>
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    disabled={isLoading}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoginMode ? t('auth.loginButton') : t('auth.registerButton')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setErrors({});
                }}
                className="text-sm text-primary hover:underline"
              >
                {isLoginMode ? t('auth.noAccount') : t('auth.hasAccount')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
