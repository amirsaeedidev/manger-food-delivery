/**
 * Application entry point
 * نقطه ورود
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// Self-hosted Persian font (variable weights 100-900); the font stack is defined in styles/variables.css.
import '@fontsource-variable/vazirmatn';

// Order matters: Tailwind first, then design tokens, global styles and responsive overrides.
import './styles/tailwind.css';
import './styles/variables.css';
import './styles/index.css';
import './styles/responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
