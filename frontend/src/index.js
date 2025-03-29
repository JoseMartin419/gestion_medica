import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Obtén el contenedor donde montaremos el componente principal
const container = document.getElementById('root');

// Crea la raíz de React 18
const root = ReactDOMClient.createRoot(container);

// Renderiza el componente principal
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación
reportWebVitals();
