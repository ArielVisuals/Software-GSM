// Form.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification"; // Importa la notificación
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [planPago, setPlanPago] = useState("");
  const [planes, setPlanes] = useState([]);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [exiting, setExiting] = useState(false); // Estado para la animación de salida
  const navigate = useNavigate();

  // Cargar planes de pago al montar el componente
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/planes");
        setPlanes(response.data);
      } catch (error) {
        console.error("Error al obtener los planes de pago:", error);
      }
    };
    fetchPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        abonado: subscriberNumber,
        desbloqueo: unlockCode,
        planPago, // Envía el ID del plan de pago seleccionado
      });

      // Validación de respuesta y verificación de los tres parámetros en el backend
      if (response.data.success) {
        if (response.data.estado === "010") {
          navigate("/service-result", {
            state: {
              abonadoId: subscriberNumber,
              ingreso: "N/A",
              servicio: "N/A",
              message: "Sistema lo detecto como robado por lo tanto no accedió",
              planPago,
            },
          });
          return;
        }

        if (response.data.estado === "011") {
          navigate("/service-result", {
            state: {
              abonadoId: subscriberNumber,
              ingreso: "N/A",
              servicio: "N/A",
              message:
                "Sistema lo detecto como clonado por lo tanto no accedió",
              planPago,
            },
          });
          return;
        }

        // Caso de éxito (estado 100), redirige con el plan de pago obtenido
        navigate("/auth", { state: { abonadoId: subscriberNumber, planPago } });
      } else {
        // Error en credenciales o plan de pago no válido
        navigate("/auth-failed", {
          state: {
            message: "Número, código de desbloqueo o plan de pago incorrecto",
          },
        });
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setError("Error en la conexión con el servidor. Verifique el servicio.");
    }
  };

  const handleViewReport = () => {
    navigate("/history");
  };

  const handleCloseNotification = () => {
    setExiting(true); // Activa la animación de salida
    setTimeout(() => setShowNotification(false), 500); // Oculta la notificación después de la animación
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="card">
          <div className="logo-container">
            <img
              src={`${import.meta.env.BASE_URL}phone.svg`}
              alt="Phone Icon"
              className="logo"
            />
          </div>
          <h2 className="title">
            Coloca tu número telefónico, código de desbloqueo y plan de pago
            para acceder a servicios.
          </h2>
          {error && <p className="error animate-alert">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="label">Número de Abonado</label>
              <input
                type="tel"
                placeholder="Ejemplo: 5578857424"
                className="input"
                value={subscriberNumber}
                onChange={(e) => setSubscriberNumber(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="label">Código de Desbloqueo</label>
              <select
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value)}
                className="input"
              >
                <option value="">Seleccione un método</option>
                <option value="1">Huella</option>
                <option value="2">Patrón</option>
                <option value="3">Rostro</option>
                <option value="4">PIN</option>
              </select>
            </div>
            <div className="input-container">
              <label className="label">Plan de Pago</label>
              <select
                value={planPago}
                onChange={(e) => setPlanPago(e.target.value)}
                className="input"
              >
                <option value="">Seleccione un plan de pago</option>
                {planes.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="button">
              Acceder
            </button>
          </form>
          <button className="button" onClick={handleViewReport}>
            Ver Reporte
          </button>
        </div>
      </div>
      <Footer />

      {/* Mostrar notificación si showNotification es true */}
      {showNotification && (
        <Notification
          onClose={handleCloseNotification}
          className={exiting ? "notification-exit" : ""}
        />
      )}
    </div>
  );
}

export default Form;
