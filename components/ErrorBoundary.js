import React from "react";

/**
 * Class component error boundary. React still requires class components
 * for catching errors in the render tree.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-neurix-bg px-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-2">⚠️ Oups</h1>
          <p className="text-gray-400 mb-6">
            Une erreur inattendue est survenue. L&apos;équipe a été notifiée.
          </p>
          {this.state.error?.message && (
            <pre className="text-left text-xs text-red-400 bg-[#111827] border border-gray-800 rounded-lg p-3 mb-6 overflow-auto">
              {this.state.error.message}
            </pre>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="bg-[#6366F1] hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}
