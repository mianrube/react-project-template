import { Component } from 'react';

import type { ErrorInfo, PropsWithChildren } from 'react';

import { ErrorFallback } from './ErrorFallback';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  public constructor(props: PropsWithChildren) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Replace with real telemetry later (App Insights, Sentry, etc.)
    console.error('Unhandled render error', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
