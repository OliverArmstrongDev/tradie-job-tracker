import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';
import LayoutWrapper from './containers/LayoutWrapper';
import { MainContextProvider } from './contexts/MainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainContextProvider> 
      <LayoutWrapper>
        <App />
      </LayoutWrapper>
    </MainContextProvider>
  </React.StrictMode>
);


