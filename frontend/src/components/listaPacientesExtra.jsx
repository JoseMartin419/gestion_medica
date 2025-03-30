// src/components/listaPacientesExtra.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const ListaPacientesExtra = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // listaPacientesExtra.jsx
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/consultas/") // URL correcta
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
  
        // Verifica si 'results' existe o si 'data' es directamente un array
        if (Array.isArray(response.data)) {
          setPacientes(response.data);
        } else if (response.data.results) {
          setPacientes(response.data.results);
        } else {
          setPacientes([]); // Si no hay datos
        }
      })
      .catch((error) => {
        console.error("Error al obtener consultas:", error);
        setPacientes([]); // Previene errores si la API falla
      });
  }, []);
  
  
  

  // Filtrar pacientes por nombre o teléfono
  // Verifica si pacientes es un array antes de filtrar
  console.log("Pacientes antes de filtrar:", pacientes);

const pacientesFiltrados = Array.isArray(pacientes)
? pacientes.filter((paciente) =>
    `${paciente.nombre || ""} ${paciente.telefono || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )
: [];


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Lista de Pacientes - Extra
      </h2>

      {/* Barra de búsqueda */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Buscar por nombre o teléfono"
          variant="outlined"
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "300px" }}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>

      {/* Tabla de Pacientes */}
      <TableContainer component={Paper} style={{ maxWidth: "900px", margin: "auto" }}>
        <Table>
        <TableHead>
  <TableRow style={{ backgroundColor: "#1976D2" }}>
    <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Nombre</TableCell>
    <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Fecha de Nacimiento</TableCell>
    <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Teléfono</TableCell>
    <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Alergias</TableCell>
  </TableRow>
</TableHead>

<TableBody>
  {pacientesFiltrados.map((paciente) => (
    <TableRow key={paciente.id}>
      <TableCell>{paciente.nombre || "Sin nombre"}</TableCell>
      <TableCell>{paciente.fecha_nacimiento || "Sin fecha"}</TableCell>
      <TableCell>{paciente.telefono || "Sin teléfono"}</TableCell>
      <TableCell>{paciente.alergias || "Sin alergias"}</TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default ListaPacientesExtra;
