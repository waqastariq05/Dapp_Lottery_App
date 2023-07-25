import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LotteryState from './Context/LotteryState';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LotteryState>
        <App />
      </LotteryState>
    </BrowserRouter>
  </React.StrictMode>
);