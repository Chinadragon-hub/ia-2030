import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleResetKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleResetKey);
  }

  handleResetKey = (e: KeyboardEvent) => {
    if (this.state.hasError && (e.key === 'r' || e.key === 'R')) {
      this.setState({ hasError: false });
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#05070D] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="cyber-card p-8 max-w-md space-y-4">
            <h1 className="txt-title text-blueCyan">Un problème est survenu</h1>
            <p className="txt-card text-[#E8EEF9]">
              Un problème est survenu, appuyez sur R pour recommencer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-blueElectric text-white txt-badge"
            >
              Recommencer (R)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
