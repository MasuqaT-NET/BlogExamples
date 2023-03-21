import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import OriginjsComponent from "./OriginjsComponent";

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
      <h1>@originjs/vite-plugin-federation + React</h1>
      <ul className={styles.gallery}>
        <li>a</li>
        <li className={styles.self}>
          <OriginjsComponent />
        </li>
        <li>c</li>
      </ul>
    </div>
  );
}

export default App;
