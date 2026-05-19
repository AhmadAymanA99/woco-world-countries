import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNetworkStatus, subscribe } from '../utils/networkStatus';

const NetworkStatusContext = createContext();

export const useNetworkStatus = () => {
  const ctx = useContext(NetworkStatusContext);
  if (!ctx) throw new Error('useNetworkStatus must be used within NetworkStatusProvider');
  return ctx;
};

export const NetworkStatusProvider = ({ children }) => {
  const [status, setStatus] = useState(getNetworkStatus());

  useEffect(() => {
    const unsub = subscribe(setStatus);
    return unsub;
  }, []);

  return (
    <NetworkStatusContext.Provider value={status}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
