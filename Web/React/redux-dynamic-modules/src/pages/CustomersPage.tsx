import React from "react";
import { connect } from "react-redux";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import {
  CustomersModuleOwnState,
  getCustomersModule
} from "../modules/customers";

interface Props {
  customers: { id: string; name: string; saleAccount: number }[] | null;
}

const Customers: React.FunctionComponent<Props> = ({ customers }) => (
  <div>
    <h1>List of Customers</h1>
    {customers ? (
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.name} ${c.saleAccount}
          </li>
        ))}
      </ul>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

type ReduxState = CustomersModuleOwnState; // append it if this page uses other

const CustomersConnected = connect((state: ReduxState) => ({
  customers: state.customers
}))(Customers);

const CustomersPage: React.FunctionComponent = () => (
  <DynamicModuleLoader modules={[getCustomersModule()]}>
    <CustomersConnected />
  </DynamicModuleLoader>
);

export default CustomersPage;
