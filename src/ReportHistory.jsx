// ReportHistory.jsx
import React, { useContext, useEffect } from "react";
import { ReportContext } from "./ReportContext";
import "./ReportHistory.css";

function ReportHistory() {
  const { reportHistory } = useContext(ReportContext);

  useEffect(() => {
    console.log("Historial de reportes en ReportHistory:", reportHistory);
  }, [reportHistory]);

  return (
    <div className="report-history-container">
      <div className="container">
        <div className="card">
          <h2 className="title">Últimos 5 reportes de abonados</h2>
          {reportHistory.length > 0 ? (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Abonado ID</th>
                  <th>Ingreso (VLR/HLR)</th>
                  <th>Plan de Pago</th>
                  <th>Servicio Requerido</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {reportHistory.map((report, index) => (
                  <tr key={index}>
                    <td>{report.abonadoId}</td>
                    <td>{report.ingreso}</td>
                    <td>{report.planPago}</td>
                    <td>{report.servicio}</td>{" "}
                    {/* Confirmación del nombre del servicio */}
                    <td>{report.resultado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay reportes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportHistory;
