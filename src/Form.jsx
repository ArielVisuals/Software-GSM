import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [confirmPaymentInfo, setConfirmPaymentInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(subscriberNumber)) {
      setError("El número de abonado debe tener exactamente 10 dígitos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (paymentInfo !== confirmPaymentInfo) {
      setError("La información de pago no coincide.");
      return;
    }

    // Si todas las validaciones pasan, redirige a la pantalla de autenticación
    setError("");
    navigate("/auth");
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
            Coloca tu número telefónico para acceder a servicios.
          </h2>
          {error && <p className="error animate-alert">{error}</p>}{" "}
          {/* Clase para animación */}
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
            <div className="input-container">
              <label className="label">Información de Pago</label>
              <input
                type="text"
                placeholder="Ingresa tu información de pago"
                className="input"
                value={paymentInfo}
                onChange={(e) => setPaymentInfo(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="label">Confirma tu Información de Pago</label>
              <input
                type="text"
                placeholder="Confirma tu información de pago"
                className="input"
                value={confirmPaymentInfo}
                onChange={(e) => setConfirmPaymentInfo(e.target.value)}
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
