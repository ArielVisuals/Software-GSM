import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        abonado: subscriberNumber,
        contraseña: password,
      });

      if (response.data.success) {
        console.log("Estado del usuario:", response.data.estado); // Verifica el estado en consola
        console.log("Operador del usuario:", response.data.operador); // Verifica el operador en consola

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
          state: { message: "Número o contraseña incorrectos" },
        });
      }
    } catch (error) {
      setError("Error en la conexión con el servidor");
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
            Coloca tu número telefónico y contraseña para acceder a servicios.
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
              <label className="label">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
