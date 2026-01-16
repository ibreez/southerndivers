import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

console.time('App load');
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);