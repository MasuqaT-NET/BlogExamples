import React from "react";
import ReactDOM from "react-dom";
import { DefaultPage } from "./pages/DefaultPage";
import { Global, css } from "@emotion/react";
import { PortalHead } from "./infrastructures/PortalHead";

const appGlobalStyle = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Global styles={appGlobalStyle} />
    <DefaultPage />
    <PortalHead />
  </React.StrictMode>,
  document.getElementById("root")
);
