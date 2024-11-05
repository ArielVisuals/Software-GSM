// ServiceResult.jsx
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ReportContext } from "./ReportContext"; // Ajuste de la ruta para importar el contexto correctamente
import "./ServiceResult.css";

function ServiceResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addReport } = useContext(ReportContext); // Accede a addReport desde el contexto

  // Obtén los datos completos desde location.state, o define valores predeterminados si faltan
  const reportData = {
    abonadoId: location.state?.abonadoId || "N/A",
    ingreso: location.state?.ingreso || "N/A", // VLR o HLR
    servicio: location.state?.servicio || "N/A", // Servicio solicitado
    resultado: location.state?.message || "N/A", // Resultado del servicio
  };

  const handleBackToHome = () => {
    console.log("Datos del reporte actual:", reportData); // Verifica los datos del reporte
    addReport(reportData); // Agrega el reporte al historial
    navigate("/"); // Redirige al inicio
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
