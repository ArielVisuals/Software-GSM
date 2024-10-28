import React, { useState, useEffect } from "react";
import "./Form.css";

function Form() {
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [confirmPaymentInfo, setConfirmPaymentInfo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Simular la obtención de datos de la base de datos
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/get-user-data"); // Ruta de la API que debes configurar
        const data = await response.json();
        setUserData(data);
        setSubscriberNumber(data.subscriberNumber || "");
        setPaymentInfo(data.paymentInfo || "");
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubscriberNumberChange = (e) => {
    const value = e.target.value;
    setSubscriberNumber(value);
    // Limpiar mensaje de error si el campo está vacío
    if (value === "") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
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

    if (paymentInfo !== confirmPaymentInfo) {
      setError("La información de pago no coincide.");
      return;
    }

    setError("");

    // Aquí simularíamos el envío de datos a la base de datos
    try {
      const response = await fetch("/api/save-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberNumber,
          password,
          paymentInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los datos");
      }

      console.log("Datos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <p>Cargando datos...</p>
      </div>
    );
  }

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
              onChange={handleSubscriberNumberChange}
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
