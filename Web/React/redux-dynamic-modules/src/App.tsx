import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import {
  AuthModuleOwnState,
  getAuthModule,
  loginOperation
} from "./modules/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const CustomersPage = React.lazy(() =>
  import(/* webpackChunkName: "customers-page" */ "./pages/CustomersPage")
);

const EmployeesPage = React.lazy(() =>
  import(/* webpackChunkName: "employees-page" */ "./pages/EmployeesPage")
);

const Auth = connect((state: AuthModuleOwnState) => ({
  isAuthenticated: !!state.authInfo
}))(({ isAuthenticated, children }) =>
  isAuthenticated ? (
    children
  ) : (
    <Redirect to={`/login/?r=${encodeURIComponent(location.pathname)}`} />
  )
);

const Login = connect(
  (state: AuthModuleOwnState) => ({
    isAuthenticated: !!state.authInfo
  }),
  dispatch => bindActionCreators({ fakeLogin: loginOperation }, dispatch)
)(({ isAuthenticated, fakeLogin }) =>
  isAuthenticated ? (
    <Redirect to={new URLSearchParams(location.search).get("r") || "/"} />
  ) : (
    <p>
      Login Page
      <button onClick={fakeLogin}>Fake Login</button>
    </p>
  )
);

const App: React.FunctionComponent = () => (
  <Router>
    <DynamicModuleLoader modules={[getAuthModule()]}>
      <Switch>
        <Route path="/login/" component={Login} />
        <Auth>
          <div>
            <nav>
              <Link to="/">Dashboard</Link>
              <Link to="/customers/">Customers</Link>
              <Link to="/employees/">Employees</Link>
            </nav>
            <main>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" exact={true} component={IndexPage} />
                  <Route path="/customers/" component={CustomersPage} />
                  <Route path="/employees/" component={EmployeesPage} />
                  <Route component={() => <Redirect to="/" />} />
                </Switch>
              </React.Suspense>
            </main>
          </div>
        </Auth>
      </Switch>
    </DynamicModuleLoader>
  </Router>
);

export default App;
