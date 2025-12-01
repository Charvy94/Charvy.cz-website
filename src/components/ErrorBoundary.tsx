import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Něco se pokazilo</h1>
              <p className="text-muted-foreground">
                Omlouváme se, došlo k neočekávané chybě. Náš tým byl informován.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-muted p-4 rounded-lg text-left text-sm">
                <p className="font-semibold mb-2">Chyba (pouze pro vývojáře):</p>
                <pre className="whitespace-pre-wrap break-words text-xs">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReset} variant="default">
                Zpět na hlavní stránku
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Zkusit znovu
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
