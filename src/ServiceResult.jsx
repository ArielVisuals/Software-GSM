// ServiceResult.jsx
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ReportContext } from "./ReportContext";
import "./ServiceResult.css";

function ServiceResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addReport } = useContext(ReportContext);

  const reportData = {
    abonadoId: location.state?.abonadoId || "N/A",
    ingreso: location.state?.ingreso || "N/A",
    servicio: location.state?.servicio || "N/A", // Confirmación del nombre del servicio
    planPago: location.state?.planPago || "N/A",
    resultado: location.state?.message || "N/A",
  };

  const handleBackToHome = () => {
    console.log("Datos del reporte actual:", reportData);
    addReport(reportData);
    navigate("/");
  };

  return (
    <div className="service-result-container">
      <div className="service-result-card">
        <h2>{reportData.resultado}</h2>
        <button className="button" onClick={handleBackToHome}>
          Volver al Inicio
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceResult;
