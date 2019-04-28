import React, { useContext } from "react";
import UsersPage from "./UsersPage";
import AuthContext from "./AuthContext";
import LoginPage from "./LoginPage";

const App: React.FunctionComponent = () => {
  const { info } = useContext(AuthContext);

  // guard
  return info ? <UsersPage /> : <LoginPage />;
};

export default App;
