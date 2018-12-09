import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// tslint:disable-next-line:no-implicit-dependencies
import { shallow } from "enzyme";

it("okay with Enzyme", () => {
  const app = shallow(<App />);
  expect(app.find(`[data-testid="logo"]`).length).toBe(1);
});

// tslint:disable-next-line:no-implicit-dependencies no-submodule-imports
import "jest-dom/extend-expect";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies no-submodule-imports
import "react-testing-library/cleanup-after-each";

it("okay with React Testing Library", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("logo")).toBeDefined();
});
