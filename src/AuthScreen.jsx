import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthScreen.css";

function AuthScreen() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simular una autenticación con un retraso
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos de retraso para simular autenticación
    return () => clearTimeout(timer);
  }, []);

  // Datos ficticios que podrían provenir de la base de datos
  const data = {
    BBS: "GlobalTech123",
    MNC: "05",
    MCC: "310",
    Frecuencia: "1900 MHz",
  };

  const handleContinue = () => {
    navigate("/servicio");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {loading ? (
          <div className="auth-loader">
            <div className="loader"></div> {/* Loader animado */}
            <p>Autenticando...</p>
          </div>
        ) : (
          <div className="auth-content">
            <div className="auth-message success">
              <p>¡Autenticación exitosa!</p>
            </div>
            <h2>Bienvenido a tu cuenta</h2>
            <div className="auth-data">
              <p>
                <strong>BBS:</strong> {data.BBS}
              </p>
              <p>
                <strong>MNC:</strong> {data.MNC}
              </p>
              <p>
                <strong>MCC:</strong> {data.MCC}
              </p>
              <p>
                <strong>Frecuencia:</strong> {data.Frecuencia}
              </p>
            </div>
            <button className="button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthScreen;
