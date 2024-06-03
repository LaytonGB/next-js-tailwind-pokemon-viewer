"use client";

import { createContext, useContext, useState } from "react";

type TAlert = "success" | "error" | "warning" | "info";

type AlertDetails = {
  message: string;
  type: TAlert;
};

type AlertContext = {
  alerts: AlertDetails[];
  addAlert: (message: string, type: TAlert) => void;
  removeAlert: (index: number) => void;
};

const AlertContext = createContext({} as AlertContext);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState([] as AlertDetails[]);

  const addAlert = (message: string, type: TAlert) => {
    setAlerts([...alerts, { message, type }]);
  };

  // Remove an alert from the list
  const removeAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
}

export function Alert({
  message,
  type,
  index,
}: AlertDetails & { index: number }) {
  const { removeAlert } = useAlerts();
  return (
    <div>
      {message}
      <button onClick={() => removeAlert(index)}>X</button>
    </div>
  );
}

export function AlertList() {
  const { alerts } = useAlerts();
  return (
    <div>
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          index={index}
          message={alert.message}
          type={alert.type}
        />
      ))}
    </div>
  );
}

export default AlertList;
