import React from "react";
import { AuthModuleOwnState } from "../modules/auth";
import { connect } from "react-redux";

interface Props {
  userName: string | null;
}

const Dashboard: React.FunctionComponent<Props> = ({ userName }) => (
  <div>
    <h1>Hello World!!</h1>
    <p>Welcome {userName}!</p>
  </div>
);

type ReduxState = AuthModuleOwnState; // assuming "auth" module is loaded globally

// assuming "auth" module is loaded globally
const DashboardPage = connect((state: ReduxState) => ({
  userName: state.authInfo && state.authInfo.name
}))(Dashboard);

export default DashboardPage;
