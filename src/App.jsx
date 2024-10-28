import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form"; // Pantalla 1
import AuthScreen from "./AuthScreen"; // Pantalla de Autenticación exitosa
import AuthFailed from "./AuthFailed"; // Pantalla de Autenticación fallida
import ServiceForm from "./ServiceForm"; // Pantalla 2

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} /> {/* Pantalla 1 */}
        <Route path="/auth" element={<AuthScreen />} /> {/* Pantalla exitosa */}
        <Route path="/auth-failed" element={<AuthFailed />} />{" "}
        {/* Pantalla fallida */}
        <Route path="/servicio" element={<ServiceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
