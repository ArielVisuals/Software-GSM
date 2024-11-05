// Notification.jsx
import React from "react";
import "./Notification.css";

function Notification({ onClose }) {
  return (
    <div
      className="notification"
      style={{
        position: "fixed",
        top: "120px",
        right: "20px",
        width: "250px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "rgba(173, 216, 236, 0.15)", // Azul claro con transparencia
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Sombra más suave
        fontFamily: "Roboto, sans-serif",
        zIndex: 1000,
        backdropFilter: "blur(6px)", // Desenfoque de fondo
        border: "1px solid rgba(255, 255, 255, 0.3)", // Borde suave
        animation: "slideIn 0.5s ease-out",
      }}
    >
      <button className="close-button" onClick={onClose}>
        ✖
      </button>
      <h3 className="notification-title">Información de Códigos</h3>
      <p>
        <strong>Código de Desbloqueo:</strong>
      </p>
      <ul>
        <li>1 - Huella</li>
        <li>2 - Patrón</li>
        <li>3 - Rostro</li>
        <li>4 - PIN</li>
      </ul>
      <p>
        <strong>Código de Plan de Pago:</strong>
      </p>
      <ul>
        <li>1 - Renta</li>
        <li>2 - Amigo</li>
        <li>3 - Paquete</li>
      </ul>
    </div>
  );
}

export default Notification;
