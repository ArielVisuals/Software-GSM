// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import AuthScreen from "./AuthScreen";
import ServiceForm from "./ServiceForm";
import ServiceResult from "./ServiceResult";
import Navbar from "./Navbar"; // Importa la Navbar
import Footer from "./Footer";
import About from "./About"; // Importa el componente About

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/servicio" element={<ServiceForm />} />
          <Route path="/service-result" element={<ServiceResult />} />
          <Route path="/about" element={<About />} />{" "}
          {/* Ruta para Acerca de */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
