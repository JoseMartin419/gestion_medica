import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// 🎨 Tema personalizado más refinado
const theme = createTheme({
  palette: {
    primary: { main: '#007aff' }, // Azul moderno
    secondary: { main: '#00c6ff' },
    background: { default: '#eaeff1' },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", sans-serif',
    h5: {
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
});

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    nombre: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/pacientes/', patientData);
      setOpen(true);
      const pacienteId = response.data.id;
      if (pacienteId) {
        setTimeout(() => {
          navigate(`/historia-clinica/${pacienteId}`);
        }, 1500);
      }
    } catch (error) {
      console.error('🚨 Error al guardar paciente:', error);
      if (error.response) {
        console.log("❗ Respuesta del backend:", error.response.data);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
          padding: 2,
        }}
      >
        <Paper elevation={6} sx={{ padding: 5, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" align="center">
            Registro de Paciente
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  label="Nombre completo"
                  name="nombre"
                  value={patientData.nombre}
                  onChange={handleChange}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  label="Fecha de Nacimiento"
                  type="date"
                  name="fecha_nacimiento"
                  value={patientData.fecha_nacimiento}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  label="Teléfono"
                  name="telefono"
                  value={patientData.telefono}
                  onChange={handleChange}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  value={patientData.email}
                  onChange={handleChange}
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={true}
                  sx={{
                    paddingY: 1.2,
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#005bb5',
                    },
                  }}
                >
                  Guardar Paciente
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Alerta de éxito */}
        <Snackbar open={open} autoHideDuration={1500} onClose={() => setOpen(false)}>
          <Alert severity="success" sx={{ width: '100%' }}>
            ¡Paciente guardado con éxito!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default PatientForm;

