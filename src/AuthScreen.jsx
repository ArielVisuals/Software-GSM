import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthScreen.css";

function AuthScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const abonadoId = 1; // Simula el ID de abonado, reemplázalo según sea necesario

  useEffect(() => {
    // Simula un tiempo de autenticación y luego obtiene los datos del abonado
    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:5001/api/abonado/${abonadoId}`)
        .then((response) => {
          setData(response.data); // Guarda los datos en el estado
          setLoading(false); // Desactiva el loader
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
          setLoading(false);
        });
    }, 2000); // 2 segundos de retraso

    return () => clearTimeout(timer);
  }, []);

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
            {data && (
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
            )}
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
