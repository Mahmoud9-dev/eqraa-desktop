import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Translations } from '@/lib/i18n';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorBoundaryProps {
  children: ReactNode;
  t: Translations;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// ---------------------------------------------------------------------------
// Class component (React requires class components for error boundaries)
// ---------------------------------------------------------------------------

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('ErrorBoundary caught an error', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children, t } = this.props;

    if (!hasError) {
      return children;
    }

    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{t.errors.unknownError}</CardTitle>
            <CardDescription>{t.errors.networkError}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-3">
            <Button onClick={this.handleRetry}>
              {t.errors.errorBoundaryRetry}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">{t.errors.backHome}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

// ---------------------------------------------------------------------------
// Wrapper function component (provides hook-based translations to the class)
// ---------------------------------------------------------------------------

function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <ErrorBoundary t={t}>
      {children}
    </ErrorBoundary>
  );
}

export { ErrorBoundary, ErrorBoundaryWrapper };
