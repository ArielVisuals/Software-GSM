// ServiceForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./ServiceForm.css";

function ServiceForm() {
  const [servicios, setServicios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const abonadoId = location.state?.abonadoId;
  const ingreso = location.state?.ingreso;
  const planPago = location.state?.planPago;

  useEffect(() => {
    if (!abonadoId) {
      setError(
        "Error: ID de abonado no encontrado. Por favor, inicia sesión nuevamente."
      );
      return;
    }
  }, [abonadoId]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/servicios");
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        setError("Error al obtener los servicios o plan de pago");
      }
    };

    fetchServicios();
  }, []);

  const handleConfirm = async () => {
    if (!selectedServicio) {
      setError("Selecciona un servicio antes de confirmar.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/validar-servicio",
        {
          abonadoId,
          servicioId: selectedServicio,
        }
      );

      const { message } = response.data;
      const selectedServiceName =
        servicios.find((servicio) => servicio.id === selectedServicio)
          ?.nombre || "N/A"; // Captura el nombre del servicio

      setTimeout(() => {
        navigate("/service-result", {
          state: {
            abonadoId,
            ingreso,
            servicio: selectedServiceName, // Pasa el nombre del servicio
            planPago,
            message,
          },
        });
        setIsVerifying(false);
      }, 2000);
    } catch (error) {
      console.error("Error al validar el servicio:", error);
      setError("Error al validar el servicio.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="container">
      <div className={`card ${isVerifying ? "" : "animate-card"}`}>
        {isVerifying ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>
              Verificando disponibilidad de antenas por cobertura, analizando
              plan de pago...
            </p>
          </div>
        ) : (
          <>
            <h2 className="title">¿Qué servicio requiere?</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-container">
              <label className="label">Servicio</label>
              <select
                className="input"
                value={selectedServicio}
                onChange={(e) => setSelectedServicio(e.target.value)}
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="button" onClick={handleConfirm}>
              Confirmar
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ServiceForm;
