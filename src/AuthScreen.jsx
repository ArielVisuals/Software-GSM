// AuthScreen.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
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
        console.log("Datos recibidos:", response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        navigate("/authfailed"); // Redirigir a AuthFailed en caso de error
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    if (abonadoId) {
      fetchUserData();
    }
  }, [abonadoId, navigate]);

  const handleContinue = () => {
    const ingreso = userData?.operador === 2 ? "HLR" : "VLR";
    const planPago = userData?.plan_pago || "N/A"; // Obtén el nombre del plan de pago

    navigate("/servicio", { state: { abonadoId, ingreso, planPago } });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {loading ? (
          <div className="auth-loader">
            <div className="loader"></div>
            <p>
              Autenticando GSM...
              <br />
              Comparando con LAC 939.
            </p>
          </div>
        ) : (
          <div className="auth-content">
            <div
              className={`auth-message ${
                userData?.operador === 2 ? "hlr" : "vlr"
              }`}
            >
              <p>
                {userData?.operador === 2 ? (
                  "Bienvenido como HLR"
                ) : (
                  <>
                    Bienvenido como VLR
                    <br />
                    {userData?.operador === 3 ? (
                      <>
                        Su operador es de una frecuencia diferente.
                        <br />
                        Los vamos a conmutar hacia UMTS.
                      </>
                    ) : (
                      <>Hand OFF de operador</>
                    )}
                  </>
                )}
              </p>
            </div>
            <h2>Bienvenido</h2>
            <div className="auth-data">
              <p>
                <strong>BSS (LAC):</strong> {userData?.LAC || "N/A"}
              </p>
              <p>
                <strong>Alcaldia:</strong> {userData?.Alcaldia || "N/A"}
              </p>
              <p>
                <strong>Operador:</strong> {userData?.OperadorNombre || "N/A"}
              </p>
              <p>
                <strong>Frecuencia:</strong> {userData?.Frecuencia || "N/A"}
              </p>
              <p>
                <strong>Plan de Pago:</strong> {userData?.plan_pago || "N/A"}
              </p>
            </div>
            <button className="button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AuthScreen;
