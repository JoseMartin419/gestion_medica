// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.css";

import Navbar from "./components/Navbar";
import CitasPage from "./pages/CitasPage";
import ConsultasPage from "./pages/ConsultasPage";
import ExpedientesPage from "./pages/ExpedientesPage";
import HistorialClinicoPage from "./pages/HistorialClinicoPage";
import PacientesPage from "./pages/PacientesPage";
import PagosPage from "./pages/PagosPage";
import RecetasPage from "./pages/RecetasPage";
import UsuariosPage from "./pages/UsuariosPage";
import NuevaConsulta from "./pages/NuevaConsulta";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import ListaPacientesExtra from "./components/listaPacientesExtra";

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Nuevo estado para colapsar

  return (
    <Router>
      <MainContent
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Router>
  );
}

function MainContent({
  isFormSubmitted,
  setIsFormSubmitted,
  isCollapsed,
  setIsCollapsed,
}) {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />
      <div className={`main-container ${isCollapsed ? "collapsed" : ""}`}>
        <div className="content">
          {/* Transiciones suaves entre rutas */}
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={300}
            >
              <Routes location={location}>
                {/* Página principal con formulario */}
                <Route
                  path="/"
                  element={
                    <>
                      <h1>Bienvenido al Sistema Médico Aragón</h1>
                      <PatientForm onSubmit={() => setIsFormSubmitted(true)} />
                      {isFormSubmitted && <PatientList />}
                    </>
                  }
                />
                <Route path="/citas" element={<CitasPage />} />
                <Route path="/consultas" element={<ConsultasPage />} />
                <Route path="/nueva-consulta" element={<NuevaConsulta />} />
                <Route path="/expedientes" element={<ExpedientesPage />} />
                <Route path="/historial-clinico" element={<HistorialClinicoPage />} />
                <Route path="/pacientes" element={<PacientesPage />} />
                <Route path="/pagos" element={<PagosPage />} />
                <Route path="/recetas" element={<RecetasPage />} />
                <Route path="/usuarios" element={<UsuariosPage />} />
                <Route path="/lista-extra" element={<ListaPacientesExtra />} /> {/* ✅ Ruta de Lista Extra */}

                {/* Nueva ruta para ListaPacientesExtra */}
                <Route path="/lista-extra" element={<ListaPacientesExtra />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
