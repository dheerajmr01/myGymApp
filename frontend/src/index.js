import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider >
        <App />     
      </WorkoutsContextProvider>
    </AuthContextProvider>  
  </React.StrictMode>
);


