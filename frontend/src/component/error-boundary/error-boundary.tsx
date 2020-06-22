import React from "react";
import ErrorComponent from "../error-component/error-component";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKeys: any[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string | null;
}

const initialState: ErrorBoundaryState = { hasError: false, error: null };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: object) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error("catched an error at ErrorBoundary", {
      error: `${error.name}: ${error.message}`,
      errorInfo: JSON.stringify(errorInfo),
    });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const hasChanged = prevProps.resetKeys.some(
      (item, index) => !Object.is(item, resetKeys[index])
    );
    const { hasError } = this.state;
    if (hasError && hasChanged) {
      this.setState(initialState);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
