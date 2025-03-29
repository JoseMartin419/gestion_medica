import React, { useState } from "react";
import "./ConsultaForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePrescription } from "react-icons/fa";

const ConsultaForm = ({ pacienteId, medicoId }) => {
  const [formData, setFormData] = useState({
    antecedentes: "",
    peso: "",
    talla: "",
    imc: "",
    frecuencia_cardiaca: "",
    frecuencia_respiratoria: "",
    presion_arterial: "",
    glucometria: "",
    oximetria: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarConsulta = async (e) => {
    e.preventDefault();

    const datosConsulta = {
      ...formData,
      paciente: pacienteId,
      medico: medicoId,
      fecha_creacion: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/consultas/guardar-consulta/",
        datosConsulta
      );

      console.log("✅ Consulta guardada:", response.data);

      if (response.data.receta_pdf_url) {
        window.open(response.data.receta_pdf_url, "_blank");

        toast.success(
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaFilePrescription style={{ marginRight: 8 }} />
            Receta generada correctamente
          </div>
        );
      } else {
        toast.warn("Consulta guardada, pero no se pudo abrir la receta.");
      }

      setFormData({
        antecedentes: "",
        peso: "",
        talla: "",
        imc: "",
        frecuencia_cardiaca: "",
        frecuencia_respiratoria: "",
        presion_arterial: "",
        glucometria: "",
        oximetria: "",
      });

    } catch (error) {
      console.error("❌ Error al guardar consulta:", error);
      toast.error("Ocurrió un error al guardar la consulta.");
    }
  };

  return (
    <div className="consulta-form-container">
      <h2>Registrar Consulta Médica</h2>
      <form onSubmit={guardarConsulta}>
        <label>Antecedentes:</label>
        <textarea name="antecedentes" value={formData.antecedentes} onChange={handleChange} />

        <label>Peso (kg):</label>
        <input type="number" name="peso" value={formData.peso} onChange={handleChange} />

        <label>Talla (m):</label>
        <input type="number" name="talla" value={formData.talla} onChange={handleChange} />

        <label>IMC:</label>
        <input type="number" name="imc" value={formData.imc} onChange={handleChange} />

        <label>Frecuencia Cardíaca (bpm):</label>
        <input type="number" name="frecuencia_cardiaca" value={formData.frecuencia_cardiaca} onChange={handleChange} />

        <label>Frecuencia Respiratoria:</label>
        <input type="number" name="frecuencia_respiratoria" value={formData.frecuencia_respiratoria} onChange={handleChange} />

        <label>Presión Arterial:</label>
        <input type="text" name="presion_arterial" value={formData.presion_arterial} onChange={handleChange} />

        <label>Glucometría:</label>
        <input type="number" name="glucometria" value={formData.glucometria} onChange={handleChange} />

        <label>Oximetría:</label>
        <input type="number" name="oximetria" value={formData.oximetria} onChange={handleChange} />

        <button type="submit">Guardar y Generar Receta</button>
      </form>

      {/* Aquí va el ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ConsultaForm;
