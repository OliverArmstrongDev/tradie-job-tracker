import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./containers/App";
import LayoutWrapper from "./containers/LayoutWrapper";
import { MainContextProvider } from "./contexts/MainContext";
import {ErrorBoundary} from "react-error-boundary"
import FallBack from './components/FallBack'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={FallBack}
    >
      <MainContextProvider>
        <LayoutWrapper>
          <App />
        </LayoutWrapper>
      </MainContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
