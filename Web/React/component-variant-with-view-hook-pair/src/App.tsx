import Filer from "./Filer";
import { css } from "@emotion/react";

function App() {
  return (
    <div
      css={css`
        height: 100%;
        padding: 20px;
        background: #eceff1;
      `}
    >
      <Filer />
    </div>
  );
}

export default App;
