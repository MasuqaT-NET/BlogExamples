import reactLogo from "./assets/react.svg";
import styles from "./App.module.css";
import WebpackComponent from "./WebpackComponent";
const webpackLogo = "/webpack.svg";

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
        <li className={styles.self}>
          <WebpackComponent />
        </li>
        <li>c</li>
      </ul>
    </div>
  );
}

export default App;
