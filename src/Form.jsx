// Form.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        abonado: subscriberNumber,
        desbloqueo: unlockCode,
      });

      if (response.data.success) {
        if (response.data.estado === "010" || response.data.estado === "011") {
          navigate("/auth-failed", {
            state: {
              message:
                "No se pudo comprobar tus credenciales y/o está en la lista de EIR como robado o clonado.",
            },
          });
        } else {
          navigate("/auth", { state: { abonadoId: subscriberNumber } });
        }
      } else {
        navigate("/auth-failed", {
          state: { message: "Número o código de desbloqueo incorrectos" },
        });
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setError("Error en la conexión con el servidor. Verifique el servicio.");
    }
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
            Coloca tu número telefónico y código de desbloqueo para acceder a
            servicios.
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
            <button type="submit" className="button">
              Acceder
            </button>
          </form>
        </div>
      </div>
      <Footer /> {/* Agregar el Footer aquí */}
    </div>
  );
}

export default Form;
