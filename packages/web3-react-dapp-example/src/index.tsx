import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3ConnectionContextProvider } from './context/web3Connection.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ConnectionContextProvider>
      <App />
    </Web3ConnectionContextProvider>
  </React.StrictMode>
);
