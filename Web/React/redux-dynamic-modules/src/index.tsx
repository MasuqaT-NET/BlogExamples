import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import App from "./App";
import store from "./modules";

const root = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
