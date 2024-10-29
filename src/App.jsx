import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";
import AuthScreen from "./AuthScreen";
import AuthFailed from "./AuthFailed"; // Pantalla de autenticación fallida
import ServiceForm from "./ServiceForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />{" "}
        {/* Pantalla de inicio de sesión */}
        <Route path="/auth" element={<AuthScreen />} />{" "}
        {/* Pantalla de autenticación exitosa */}
        <Route path="/auth-failed" element={<AuthFailed />} />{" "}
        {/* Pantalla de autenticación fallida */}
        <Route path="/servicio" element={<ServiceForm />} />{" "}
        {/* Pantalla de selección de servicio */}
      </Routes>
    </Router>
  );
}

export default App;
