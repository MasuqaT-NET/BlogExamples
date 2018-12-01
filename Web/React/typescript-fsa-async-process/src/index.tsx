import * as React from "react";
import { render } from "react-dom";
import { createStore } from "./modules";
import { Provider } from "react-redux";
import ThunkView from "./views/ThunkView";
import SagaView from "./views/SagaView";
import ObservableView from "./views/ObservableView";

const store = createStore();

render(
  <Provider store={store}>
    <>
      <style>{`button { margin-left: 8px; }`}</style>
      <ThunkView />
      <SagaView />
      <ObservableView />
    </>
  </Provider>,
  document.getElementById("app")
);
