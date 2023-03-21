import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./ModuleFederationComponent.module.css";

function ModuleFederationComponent() {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </div>
      <p className={styles.description}>@module-federation/vite + React</p>
    </div>
  );
}

export default ModuleFederationComponent;
