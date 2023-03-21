import reactLogo from "./assets/react.svg";
import webpackLogo from "./../public/webpack.svg";
import styles from "./App.module.css";
import WebpackComponent from "./WebpackComponent";
import OriginjsComponent1 from "team_with_originjs_vite_plugin_federation/OriginjsComponent";
const OriginjsComponent = OriginjsComponent1.default;

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img
          src={webpackLogo}
          className={`${styles.logo} ${styles.webpack}`}
          alt="Webpack logo"
        />
        <img
          src={reactLogo}
          className={`${styles.logo} ${styles.react}`}
          alt="React logo"
        />
      </div>
      <h1>Webpack + React</h1>
      <ul className={styles.gallery}>
        <li>a</li>
        <li>
          <OriginjsComponent />
        </li>
        <li className={styles.self}>
          <WebpackComponent />
        </li>
      </ul>
    </div>
  );
}

export default App;
