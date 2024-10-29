import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AuthScreen.css";

function AuthScreen() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const abonadoId = location.state?.abonadoId;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/abonado/${abonadoId}`
        );
        setUserData(response.data);
        console.log("Operador recibido:", response.data.operador); // Verifica el valor de operador
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    if (abonadoId) {
      fetchUserData();
    }
  }, [abonadoId]);

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
            <div
              className={`auth-message ${
                userData?.operador == 2 ? "hlr" : "vlr"
              }`}
            >
              <p>
                {userData?.operador == 2
                  ? "Bienvenido como HLR"
                  : "Bienvenido como VLR"}
              </p>
            </div>
            <h2>Bienvenido a tu cuenta</h2>
            <div className="auth-data">
              <p>
                <strong>Frecuencia:</strong> {userData?.Frecuencia || "N/A"}
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
