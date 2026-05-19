import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WifiOff, ServerOff, X } from 'lucide-react';
import { useNetworkStatus } from '../contexts/NetworkStatusContext';

const NetworkBanner = () => {
  const { t } = useTranslation();
  const { isOnline, isBackendOnline } = useNetworkStatus();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isOnline && isBackendOnline) {
      setDismissed(false);
    }
  }, [isOnline, isBackendOnline]);

  const showOffline = !isOnline;
  const showBackendDown = isOnline && !isBackendOnline && !dismissed;

  if (!showOffline && !showBackendDown) return null;

  return (
    <div
      className={`fixed top-0 inset-x-0 z-[9999] px-4 py-3 text-center text-sm font-medium shadow-lg transition-transform ${
        showOffline
          ? 'bg-yellow-500 text-white'
          : 'bg-red-500 text-white'
      }`}
      role="alert"
    >
      <div className="flex items-center justify-center gap-2">
        {showOffline ? (
          <>
            <WifiOff className="h-4 w-4 flex-shrink-0" />
            <span>{t('network.offline')}</span>
          </>
        ) : (
          <>
            <ServerOff className="h-4 w-4 flex-shrink-0" />
            <span>{t('network.backendDown')}</span>
          </>
        )}
        {showBackendDown && (
          <button
            onClick={() => setDismissed(true)}
            className="ms-2 p-1 rounded hover:bg-white/20 transition-colors"
            aria-label={t('common.dismiss')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NetworkBanner;
