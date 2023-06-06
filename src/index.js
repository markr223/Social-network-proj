import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
import "font-awesome/css/font-awesome.css";

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
