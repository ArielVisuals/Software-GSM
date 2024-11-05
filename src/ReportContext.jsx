// ReportContext.js
import React, { createContext, useState } from "react";

export const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reportHistory, setReportHistory] = useState([]);

  const addReport = (report) => {
    setReportHistory((prevReports) => {
      // Si ya hay 5 reportes, elimina el más antiguo y agrega el nuevo
      const updatedReports =
        prevReports.length >= 5
          ? [...prevReports.slice(1), report]
          : [...prevReports, report];

      console.log("Historial de reportes actualizado:", updatedReports); // Verificar los reportes
      return updatedReports;
    });
  };

  return (
    <ReportContext.Provider value={{ reportHistory, addReport }}>
      {children}
    </ReportContext.Provider>
  );
}
