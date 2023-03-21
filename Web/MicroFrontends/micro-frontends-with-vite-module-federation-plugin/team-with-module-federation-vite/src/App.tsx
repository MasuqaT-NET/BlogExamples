import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import ModuleFederationComponent from "./ModuleFederationComponent";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img
          src={viteLogo}
          className={`${styles.logo} ${styles.vite}`}
          alt="Vite logo"
        />
        <img
          src={reactLogo}
          className={`${styles.logo} ${styles.react}`}
          alt="React logo"
        />
      </div>
      <h1>@module-federation/vite + React</h1>
      <ul className={styles.gallery}>
        <li className={styles.self}>
          <ModuleFederationComponent />
        </li>
        <li>b</li>
        <li>c</li>
      </ul>
    </div>
  );
}

export default App;
