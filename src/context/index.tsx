import { Alert, AlertProps } from '@aws-amplify/ui-react';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export interface AlertContextProps {
  alert: AlertProps | null;
  setAlert: (alert: AlertProps) => void;
}

const AlertContext = createContext<AlertContextProps | null>(null);

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const value = useMemo(() => ({
    alert,
    setAlert,
  }), [alert]);

  return (
    <AlertContext.Provider value={value}>
      {alert && (
        <Alert isDismissible {...alert}>
          {alert.children}
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
