import reactLogo from "./assets/react.svg";
import webpackLogo from "./../public/webpack.svg";
import styles from "./WebpackComponent.module.css";
import { useState } from "react";

function WebpackComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={webpackLogo} className={styles.logo} alt="Webpack logo" />
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </div>
      <p className={styles.description}>
        <button onClick={() => setCount((c) => c + 1)}>Webpack + React</button>{" "}
        {count}
      </p>
    </div>
  );
}

export default WebpackComponent;
