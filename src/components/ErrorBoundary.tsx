import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error but don't let it crash the app
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Special handling for audio-related errors
    if (error.message?.includes('atob') || 
        error.message?.includes('InvalidCharacterError') ||
        error.message?.includes('loadBuffer')) {
      console.warn('Audio error detected, continuing without sound');
      
      // Try to recover from audio errors
      setTimeout(() => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
      }, 1000);
      return;
    }
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-6">🪄</div>
            <h1 className="text-3xl font-bold text-amber-300 mb-4 font-serif">
              Something went wrong!
            </h1>
            <p className="text-purple-200 mb-6">
              The magic seems to have fizzled out. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Cast Refresh Spell
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-amber-300 hover:text-amber-200">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-black/50 rounded text-xs text-red-300 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
