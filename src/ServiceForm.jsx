import React, { useState } from "react";
import "./ServiceForm.css";

function ServiceForm() {
  const [serviceKey, setServiceKey] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (serviceKey.trim() === "") {
      setError("La clave del servicio no puede estar vacía.");
      return;
    }

    setError("");
    setSuccessMessage("Servicio validado exitosamente.");
    console.log("Clave de servicio ingresada:", serviceKey);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">¿Qué servicio requiere?</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="label">Clave del Servicio</label>
            <input
              type="text"
              placeholder="Ingresa la clave del servicio"
              className="input"
              value={serviceKey}
              onChange={(e) => setServiceKey(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm; // Asegúrate de que esta línea esté presente
