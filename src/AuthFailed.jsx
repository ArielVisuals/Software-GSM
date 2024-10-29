import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthFailed.css";

function AuthFailed() {
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
        <h2>
          No pudimos verificar tus credenciales y/o esta en la lista de EIR como
          robado o clonado.
        </h2>
        <p>Por favor, inténtalo de nuevo.</p>
        <button className="button" onClick={handleRetry}>
          Volver a Intentar
        </button>
      </div>
    </div>
  );
}

export default AuthFailed;
