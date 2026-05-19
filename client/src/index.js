import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18n from './i18n/config';
import './i18n/config';
import './index.css';
import App from './App';

// Set initial lang attribute
document.documentElement.setAttribute('lang', i18n.language === 'ar' ? 'ar' : 'en');
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng === 'ar' ? 'ar' : 'en');
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

// Refetch all queries when language changes
i18n.on('languageChanged', () => {
  queryClient.refetchQueries();
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);