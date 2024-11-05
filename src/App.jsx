// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import AuthScreen from "./AuthScreen";
import ServiceForm from "./ServiceForm";
import ServiceResult from "./ServiceResult";
import Navbar from "./Navbar";
import Footer from "./Footer";
import About from "./About";
import AuthFailed from "./AuthFailed";
import AuthFailed2 from "./AuthFailed2";
import ReportHistory from "./ReportHistory"; // Importa el componente ReportHistory
import { ReportProvider } from "./ReportContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ReportProvider>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/auth-failed" element={<AuthFailed />} />
            <Route path="/auth-failed2" element={<AuthFailed2 />} />
            <Route path="/servicio" element={<ServiceForm />} />
            <Route path="/service-result" element={<ServiceResult />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<ReportHistory />} />{" "}
            {/* Ruta para ver el historial de reportes */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </ReportProvider>
  );
}

export default App;
