import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img
          src={`${import.meta.env.BASE_URL}phone.svg`}
          alt="Phone Icon"
          className="footer-logo"
        />
      </div>
      <div className="footer-right">
        <p>© {new Date().getFullYear()} Equipo</p>
        <p>Gonzalez Hernandez Kevin Ariel</p>
        <p>Gonzalez Tapia Alexis</p>
        <p>Araujo Becerra Ricardo</p>
      </div>
      <div className="footer-reserved">Todos los derechos reservados.</div>
    </footer>
  );
}

export default Footer;
