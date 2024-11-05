import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-card about-animate-card">
        {" "}
        {/* Clases específicas para evitar conflictos */}
        <h1>Acerca de este Proyecto</h1>
        <p>
          Este software simula una antena GSM que interactúa con dispositivos
          móviles para gestionar su conexión a la red y sus servicios
          disponibles.
        </p>
        <h2>Funciones principales:</h2>
        <ul>
          <li>
            <strong>Asignación de Cobertura:</strong> Identifica y establece
            conexión con dispositivos móviles en el área de cobertura.
          </li>
          <li>
            <strong>Asignación de HLR o VLR:</strong> Asigna a los usuarios como
            HLR o VLR para una gestión eficiente de la red.
          </li>
          <li>
            <strong>Hand-off:</strong> Supervisa y gestiona el cambio de
            cobertura (handoff) cuando un dispositivo se mueve entre áreas de la
            red, asegurando una conexión continua.
          </li>
          <li>
            <strong>Control de Servicios:</strong> Permite o restringe el acceso
            a servicios como llamadas, mensajería, y multimedia, en función del
            plan de pago del usuario.
          </li>
        </ul>
        <p>
          Este sistema es una herramienta integral para simular la operación de
          una red GSM, proporcionando tanto control como supervisión de
          servicios de cobertura y conexión en una red celular.
        </p>
      </div>
    </div>
  );
}

export default About;
