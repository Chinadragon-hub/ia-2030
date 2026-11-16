import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/globals.css';

const App = lazy(() => import('./App'));
const LivretPage = lazy(() =>
  import('./components/LivretPage').then((m) => ({ default: m.LivretPage }))
);
const StandaloneSouffleurPage = lazy(() =>
  import('./components/SouffleurWindow').then((m) => ({ default: m.StandaloneSouffleurPage }))
);

const RootRouter: React.FC = () => {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);

  if (path.startsWith('/livret') || params.get('view') === 'livret') {
    return <LivretPage />;
  }
  if (path.startsWith('/souffleur') || params.get('view') === 'souffleur') {
    return <StandaloneSouffleurPage />;
  }
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#05070D] text-white flex items-center justify-center font-title">
            Chargement…
          </div>
        }
      >
        <RootRouter />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
