import React from "react";
import { render } from "react-dom";
import App from "./App";
import AuthProvider from "./AuthProvider";

const root = document.getElementById("root");

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  root
);
