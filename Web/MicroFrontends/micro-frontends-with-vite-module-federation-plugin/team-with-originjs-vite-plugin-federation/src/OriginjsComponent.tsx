import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./OriginjsComponent.module.css";
import { useState } from "react";

function OriginjsComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </div>
      <p className={styles.description}>
        <button onClick={() => setCount((c) => c + 1)}>
          @originjs/vite-plugin-federation + React
        </button>{" "}
        {count}
      </p>
    </div>
  );
}

export default OriginjsComponent;
