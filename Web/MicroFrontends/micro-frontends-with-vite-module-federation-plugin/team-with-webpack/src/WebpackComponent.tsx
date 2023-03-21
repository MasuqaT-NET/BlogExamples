import reactLogo from "./assets/react.svg";
import webpackLogo from "./../public/webpack.svg";
import styles from "./WebpackComponent.module.css";

function WebpackComponent() {
  return (
    <div className={styles.root}>
      <div className={styles.logos}>
        <img src={webpackLogo} className={styles.logo} alt="Webpack logo" />
        <img src={reactLogo} className={styles.logo} alt="React logo" />
      </div>
      <p className={styles.description}>Webpack + React</p>
    </div>
  );
}

export default WebpackComponent;
