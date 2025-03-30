import React, { useState } from 'react';
import './Navbar.css';


import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle,
  Event as EventIcon,
  MedicalServices as MedicalServicesIcon,
  FolderShared as FolderSharedIcon,
  History as HistoryIcon,
  People as PeopleIcon,
  Payments as PaymentsIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NoteAddIcon from '@mui/icons-material/NoteAdd';



// 🔐 Simulación de usuario logueado (puedes reemplazar por contexto o localStorage)
const user = {
  nombre: 'Dr. José González',
  rol: 'Médico General',
  foto: null, // O puedes poner una ruta a la foto de perfil
};

const navItems = [
  { label: 'Citas', path: '/citas', icon: <EventIcon /> },
  { label: 'Consultas', path: '/consultas', icon: <MedicalServicesIcon /> },
  { label: 'Nueva Consulta', path: '/nueva-consulta', icon: <NoteAddIcon /> },
  { label: 'Expedientes', path: '/expedientes', icon: <FolderSharedIcon /> },
  { label: 'Historial Clínico', path: '/historial-clinico', icon: <HistoryIcon /> },
  { label: 'Pacientes', path: '/pacientes', icon: <PeopleIcon /> },
  { label: 'Pagos', path: '/pagos', icon: <PaymentsIcon /> },
  { label: 'Recetas', path: '/recetas', icon: <ReceiptIcon /> },
  { label: 'Usuarios', path: '/usuarios', icon: <PersonIcon /> },
  { label: 'Lista Extra', path: '/lista-extra', icon: <NoteAddIcon /> },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => {
    console.log('👋 Logout...');
  };

  const buttonAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08 },
    }),
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#0061b0', px: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* LOGO + NOMBRE */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo192.png" alt="logo" style={{ width: 40, height: 40 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Sistema Médico
            </Typography>
          </Box>

          {/* MENÚ DESKTOP */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map(({ label, path, icon }, index) => (
            <motion.div
              key={label}
              custom={index}
              variants={buttonAnimation}
              initial="hidden"
              animate="visible"
            >
              <Button
                component={NavLink}
                to={path}
                startIcon={icon}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&.active': { borderBottom: '2px solid white' }, // Esta línea es importante
                  '&:hover': { backgroundColor: '#00518f' },
                  transition: 'all 0.3s ease',
                }}
              >
                {label}
              </Button>
            </motion.div>
          ))}
              {/* Perfil del usuario */}
              <Tooltip title={`${user.nombre} - ${user.rol}`}>
                <IconButton color="inherit">
                  <Avatar>
                    {user.foto ? (
                      <img src={user.foto} alt="perfil" />
                    ) : (
                      <AccountCircle />
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Botón de logout */}
              <Tooltip title="Cerrar sesión">
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleDrawer}>
        <List>
  {navItems.map(({ label, path, icon }) => (
    <ListItem
      button
      component={NavLink}
      to={path}
      key={label}
      activeClassName="Mui-selected" // Agrega esta línea
      onClick={toggleDrawer} // Cierra el drawer al hacer clic
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  ))}
</List>

          <Divider />
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="body2" gutterBottom>
              {user.nombre} — {user.rol}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              fullWidth={true}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
