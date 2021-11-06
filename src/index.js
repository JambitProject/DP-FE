import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import "styles/transition.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css"; // for ES6 modules

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
