import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const UsersPage: React.FunctionComponent = () => {
  const { info, logout } = useContext(AuthContext);
  const [list, setList] = useState<string[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      // suspense for data fetching in the future?
      info!.token; // fetch API using token
      setList(["a", "b"]);
    }, 2000);
  }, [setList]);

  return (
    <div>
      <h1>Welcome</h1>
      <p>
        Hello {info!.userId} <button onClick={() => logout()}>Logout</button>
      </p>
      {list ? (
        <ul>
          {list.map(l => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UsersPage;
