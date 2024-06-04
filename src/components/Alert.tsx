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

const styles = {
  success:
    "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 border border-green-600",
  error:
    "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 border border-red-600",
  warning:
    "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark: text-yellow-200 border border-yellow-600",
  info: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border border-blue-600",
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
    <div className={"p-4 m-4 rounded flex justify-between " + styles[type]}>
      <span>{message}</span>
      <button onClick={() => removeAlert(index)}>❌</button>
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
