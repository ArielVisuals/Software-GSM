import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!/^\d{10}$/.test(subscriberNumber)) {
      setError("El número de abonado debe tener exactamente 10 dígitos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    // Aquí iría la lógica para el siguiente paso, como enviar los datos al servidor
    console.log("Número de abonado:", subscriberNumber);
    console.log("Contraseña:", password);
  };

  return (
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
          Coloca tu número telefónico para acceder a servicios.
        </h2>
        {error && <p className="error">{error}</p>}
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
          <div className="input-container">
            <label className="label">Confirma tu Contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Acceder
          </button>
        </form>
        <div className="footer">
          <p>
            ¿No puedes acceder al sistema?{" "}
            <a href="/app" className="link">
              Reiniciar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Form;
