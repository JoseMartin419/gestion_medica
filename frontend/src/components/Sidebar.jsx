// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaCalendarAlt,
  FaClipboardList,
  FaUserMd,
  FaBookMedical,
  FaHistory,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaPrescriptionBottleAlt,
  FaUsersCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/citas", icon: <FaCalendarAlt />, label: "Citas" },
    { path: "/consultas", icon: <FaClipboardList />, label: "Consultas" },
    { path: "/nueva-consulta", icon: <FaUserMd />, label: "Nueva Consulta" },
    { path: "/expedientes", icon: <FaBookMedical />, label: "Expedientes" },
    { path: "/historial-clinico", icon: <FaHistory />, label: "Historial Clínico" },
    { path: "/pacientes", icon: <FaUserFriends />, label: "Pacientes" },
    { path: "/pagos", icon: <FaFileInvoiceDollar />, label: "Pagos" },
    { path: "/recetas", icon: <FaPrescriptionBottleAlt />, label: "Recetas" },
    { path: "/usuarios", icon: <FaUsersCog />, label: "Usuarios" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Botón para colapsar/expandir */}
      <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </div>

      {/* Encabezado del Sidebar */}
      <div className="sidebar-header">
        <h3>{!isCollapsed ? "⚕️ Sistema Médico" : "⚕️"}</h3>
      </div>

      {/* Lista de menú */}
      <ul className="sidebar-list">
        {menuItems.map((item, index) => (
          <li key={index} className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}>
            <Link to={item.path} className="sidebar-link">
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer y botón de cierre de sesión */}
      <div className="sidebar-footer">
        {!isCollapsed && <p>👨‍⚕️ Dr. José González — Médico General</p>}
        <button className="btn-logout">
          <FaSignOutAlt /> {!isCollapsed && "Cerrar Sesión"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
