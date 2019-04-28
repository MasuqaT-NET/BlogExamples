import React, { useCallback, useMemo, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const login = useCallback(
    (userId: string, password: string) => {
      console.log(userId, password);
      setTimeout(() => {
        setToken("secret_token|" + userId);
      }, 1000);
    },
    [setToken]
  );
  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);
  const info = useMemo(
    // FIXME: get info with JWT from `token`
    () => (token ? { token, userId: token.split("|")[1] } : null),
    [token]
  );

  return (
    <AuthContext.Provider value={{ login, logout, info }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
