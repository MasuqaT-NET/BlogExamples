import React from "react";
import { render } from "react-dom";
import { LocalizationProvider } from "fluent-react";
import App from "./App";
import generateBundles from "./l10n";

const root = document.getElementById("root");

render(
  <LocalizationProvider bundles={generateBundles(navigator.languages)}>
    <App />
  </LocalizationProvider>,
  root
);
