import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

const store = createStore({}, [], [getSagaExtension()]);

export default store;
