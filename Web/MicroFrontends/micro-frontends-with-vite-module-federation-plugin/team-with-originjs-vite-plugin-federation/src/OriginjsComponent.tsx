import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./OriginjsComponent.module.css";

function OriginjsComponent() {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </div>
      <p className={styles.description}>
        @originjs/vite-plugin-federation + React
      </p>
    </div>
  );
}

export default OriginjsComponent;
