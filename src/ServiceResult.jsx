// ServiceResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./ServiceResult.css";

function ServiceResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Resultado del servicio";

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="service-result-container">
      <div className="service-result-card">
        <h2>{message}</h2>
        <button className="button" onClick={handleBackToHome}>
          Volver al Inicio
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceResult;
