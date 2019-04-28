import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";

const LoginPage: React.FunctionComponent = () => {
  const [userId, setUserId] = useState<string>("");
  const { login } = useContext(AuthContext);

  return (
    <div>
      <h1>Hello!</h1>
      <input value={userId} onChange={e => setUserId(e.target.value)} />
      <button onClick={() => login(userId, "pass")} disabled={!userId}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
