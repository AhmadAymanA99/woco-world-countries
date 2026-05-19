import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorDisplay = ({ onRetry, message }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
        <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {t('common.error')}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message || t('common.errorDefault')}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>{t('network.refresh')}</span>
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
