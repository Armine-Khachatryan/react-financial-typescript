import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
      <ToastContainer
          autoClose={4000}
          newestOnTop={true}
          closeOnClick={true}
          draggable={true}
          pauseOnHover={false}
          style={{paddingTop: "80px"}}
      />
  </React.StrictMode>
);

