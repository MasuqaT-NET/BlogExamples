import React from "react";
import { connect } from "react-redux";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import {
  EmployeesModuleOwnState,
  getEmployeesModule
} from "../modules/employees";
import { AuthModuleOwnState } from "../modules/auth";
import { BossModuleOwnState, getBossModule } from "../modules/boss";

interface Props {
  userId: string | null;
  bossId: string | null;
  employees: { id: string; name: string; title: string }[] | null;
}

const Employees: React.FunctionComponent<Props> = ({
  userId,
  bossId,
  employees
}) => (
  <div>
    <h1>List of Employees</h1>
    {employees ? (
      <ul>
        {employees.map(e => (
          <li key={e.id}>
            {e.name} [{e.title}]{" "}
            {e.id === userId ? "You!" : e.id === bossId ? "Boss!" : undefined}
          </li>
        ))}
      </ul>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

type ReduxState = AuthModuleOwnState & // assuming "auth" module is loaded globally
  EmployeesModuleOwnState &
  BossModuleOwnState;

const EmployeesConnected = connect((state: ReduxState) => ({
  userId: state.authInfo && state.authInfo.id,
  bossId: state.bossInfo && state.bossInfo.id,
  employees: state.employees
}))(Employees);

const EmployeesPage: React.FunctionComponent = () => (
  /* this page depends on "boss" module and "employees" module (assuming "auth" module is loaded globally) */
  <DynamicModuleLoader modules={[getBossModule(), getEmployeesModule()]}>
    <EmployeesConnected />
  </DynamicModuleLoader>
);

export default EmployeesPage;
