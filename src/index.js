// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './App';     // Aponta para o default export do App.js

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
