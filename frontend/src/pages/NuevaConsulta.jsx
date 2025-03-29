
// NUEVA VERSIÓN CON MEDICAMENTOS + POSOLOGÍA Y REDISEÑO DEL TRATAMIENTO

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  Paper, Grid, Typography, Box,
  Accordion, AccordionSummary, AccordionDetails,
  IconButton, List, ListItem, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import NotesIcon from '@mui/icons-material/Notes';
import MedicationIcon from '@mui/icons-material/Medication';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import { CIE10_CODES } from '../data/CIE10Codes';
import { MEDICAMENTOS } from '../data/Medicamentos';
import { ANTECEDENTES } from '../data/Antecedentes';


const NuevaConsulta = () => {
  const [datosPaciente, setDatosPaciente] = useState({ nombre: '', fechaNacimiento: '', telefono: '', correo: '' });
  const [signosVitales, setSignosVitales] = useState({ peso: '', talla: '', frecuenciaCardiaca: '', frecuenciaRespiratoria: '', presionArterial: '', temperatura: '', glucosa: '' });
  const [alergias, setAlergias] = useState('');
  const [antecedentes, setAntecedentes] = useState([]);
  const [otrosAntecedentes, setOtrosAntecedentes] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [exploracionFisica, setExploracionFisica] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState([]);
  const [medicamentoActual, setMedicamentoActual] = useState('');
  const [posologiaActual, setPosologiaActual] = useState('');
  const [ultimaConsultaId, setUltimaConsultaId] = useState(null);
  const [errores, setErrores] = useState({});

  const handleAgregarMedicamento = () => {
    if (medicamentoActual && posologiaActual) {
      setTratamiento([...tratamiento, { medicamento: medicamentoActual, posologia: posologiaActual }]);
      setMedicamentoActual('');
      setPosologiaActual('');
    }
  };

  const handleEliminarMedicamento = (index) => {
    const nuevoTratamiento = [...tratamiento];
    nuevoTratamiento.splice(index, 1);
    setTratamiento(nuevoTratamiento);
  };


  const handleGuardar = async () => {
    const nuevosErrores = {};
    if (!datosPaciente.nombre) nuevosErrores.nombre = 'Nombre obligatorio';
    if (!datosPaciente.fechaNacimiento) nuevosErrores.fechaNacimiento = 'Fecha obligatoria';
    if (!diagnostico) nuevosErrores.diagnostico = 'Diagnóstico obligatorio';
    if (tratamiento.length === 0) nuevosErrores.tratamiento = 'Debe incluir al menos un medicamento';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const datos = {
      nombre: datosPaciente.nombre,
      fecha_nacimiento: datosPaciente.fechaNacimiento,
      telefono: datosPaciente.telefono,
      correo: datosPaciente.correo,
      peso: signosVitales.peso,
      talla: signosVitales.talla,
      frecuencia_cardiaca: signosVitales.frecuenciaCardiaca,
      frecuencia_respiratoria: signosVitales.frecuenciaRespiratoria,
      presion_arterial: signosVitales.presionArterial,
      temperatura: signosVitales.temperatura,
      glucosa: signosVitales.glucosa,
      alergias: alergias,
      antecedentes: antecedentes.join(', '),
      otros_antecedentes: otrosAntecedentes,
      motivo_consulta: motivoConsulta,
      exploracion_fisica: exploracionFisica,
      diagnostico,
      tratamiento: tratamiento.map(med => `${med.medicamento}\n${med.posologia}`).join('\n'),

    };

    try {
      const response = await axios.post('http://localhost:8000/api/consultas/', datos);
      setUltimaConsultaId(response.data.id);
      alert('✅ Consulta guardada correctamente!');
    } catch (error) {
      console.error('🚨 Error al guardar la consulta:', error);
      alert('Error al guardar la consulta');
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 1100, margin: '2rem auto', backgroundColor: '#f9f9f9', borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">Nueva Consulta</Typography>

      {/* SECCIÓN 1: Datos del Paciente */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><PersonIcon sx={{ mr: 1 }} />Datos del Paciente</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Nombre Completo" fullWidth value={datosPaciente.nombre} onChange={(e) => setDatosPaciente({ ...datosPaciente, nombre: e.target.value })} error={!!errores.nombre} helperText={errores.nombre} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Fecha de Nacimiento" type="date" InputLabelProps={{ shrink: true }} fullWidth value={datosPaciente.fechaNacimiento} onChange={(e) => setDatosPaciente({ ...datosPaciente, fechaNacimiento: e.target.value })} error={!!errores.fechaNacimiento} helperText={errores.fechaNacimiento} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Teléfono Celular" fullWidth value={datosPaciente.telefono} onChange={(e) => setDatosPaciente({ ...datosPaciente, telefono: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Correo Electrónico (Opcional)" fullWidth value={datosPaciente.correo} onChange={(e) => setDatosPaciente({ ...datosPaciente, correo: e.target.value })} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* SECCIÓN 2: Signos Vitales */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><FavoriteIcon sx={{ mr: 1 }} />Signos Vitales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
          {['peso', 'talla', 'frecuenciaCardiaca', 'frecuenciaRespiratoria', 'presionArterial', 'temperatura', 'glucosa'].map((campo, idx) => (
              <Grid key={campo} item xs={6} md={2}>
                <TextField
                  label={campo === 'peso' ? 'Peso (kg)' : campo === 'talla' ? 'Talla (cm)' :
                    campo === 'frecuenciaCardiaca' ? 'Frecuencia Card. (lpm)' : campo === 'frecuenciaRespiratoria' ? 'Frecuencia Resp. (rpm)' :
                    campo === 'presionArterial' ? 'Presión (mmHg)' :
                    campo === 'temperatura' ? 'Temperatura (°C)' : 'Glucosa (mg/dL)'}
                  fullWidth
                  value={signosVitales[campo]}
                  onChange={(e) => setSignosVitales({ ...signosVitales, [campo]: e.target.value })}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* SECCIÓN 3: Antecedentes */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><HistoryIcon sx={{ mr: 1 }} />Alergias y Antecedentes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Alergias"
                fullWidth
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete multiple options={ANTECEDENTES} getOptionLabel={(option) => option} value={antecedentes} onChange={(event, newValue) => setAntecedentes(newValue)} renderInput={(params) => <TextField {...params} label="Antecedentes" />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Otros Antecedentes" fullWidth value={otrosAntecedentes} onChange={(e) => setOtrosAntecedentes(e.target.value)} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* SECCIÓN 4: Motivo y Exploración */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><NotesIcon sx={{ mr: 1 }} />Motivo y Exploración</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField label="Motivo de Consulta" multiline rows={3} fullWidth value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} /></Grid>
            <Grid item xs={12} md={6}><TextField label="Exploración Física" multiline rows={3} fullWidth value={exploracionFisica} onChange={(e) => setExploracionFisica(e.target.value)} /></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* SECCIÓN 5: Diagnóstico y Medicamentos */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><MedicationIcon sx={{ mr: 1 }} />Diagnóstico y Tratamiento</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete options={CIE10_CODES} getOptionLabel={(option) => option} value={diagnostico} onChange={(event, newValue) => setDiagnostico(newValue)} renderInput={(params) => <TextField {...params} label="Diagnóstico (CIE-10)" error={!!errores.diagnostico} helperText={errores.diagnostico} />} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Autocomplete freeSolo options={MEDICAMENTOS} value={medicamentoActual} onChange={(e, value) => setMedicamentoActual(value)} renderInput={(params) => <TextField {...params} label="Medicamento" />} fullWidth />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField label="Posología" value={posologiaActual} onChange={(e) => setPosologiaActual(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button variant="contained" color="primary" onClick={handleAgregarMedicamento} fullWidth sx={{ height: '100%' }}>Agregar</Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" mt={2}>Tratamiento Actual:</Typography>
              <List>
                {tratamiento.map((item, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" onClick={() => handleEliminarMedicamento(index)}><DeleteIcon /></IconButton>
                  }>
                    <ListItemText primary={item.medicamento} secondary={`Indicaciones: ${item.posologia}`} />
                  </ListItem>
                ))}
              </List>
              {errores.tratamiento && <Typography color="error">{errores.tratamiento}</Typography>}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* BOTONES */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleGuardar} fullWidth sx={{ py: 1.5 }}>Guardar Consulta</Button>
        {ultimaConsultaId && (
  <a
    href={`http://localhost:8000/receta_html/${ultimaConsultaId}/`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'block',
      marginTop: '16px',
      padding: '12px',
      textAlign: 'center',
      backgroundColor: 'white',
      color: '#1976d2',
      border: '2px solid #1976d2',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold'
    }}
  >
    🧾 Ver Receta Bonita
  </a>
)}
      </Box>
    </Paper>
  );
};

export default NuevaConsulta;
