import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthFailed.css";

function AuthFailed2() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/"); // Redirigir a la pantalla inicial
  };

  return (
    <div className="auth-failed-container">
      <div className="auth-failed-card">
        <div className="auth-message failed">
          <p>¡Autenticación Fallida!</p>
        </div>
        <h2>Tus credenciales se encuentran en tramite...</h2>
        <p>No podemos dar acceso.</p>
        <button className="button" onClick={handleRetry}>
          Volver a Intentar
        </button>
      </div>
    </div>
  );
}

export default AuthFailed2;
