import * as React from 'react';
import * as style from './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className={style.root}>
        <header className={style.header}>
          <img src={logo} className={style.logo} alt="logo" />
          <h1 className={style.title}>Welcome to React</h1>
        </header>
        <p className={style.introArea}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
