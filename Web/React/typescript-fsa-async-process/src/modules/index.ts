import {
  applyMiddleware,
  combineReducers,
  createStore as reduxCreateStore,
  Reducer
} from "redux";
import thunkReducer, { ThunkState } from "./thunk-duck";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import sagaReducer, { rootSaga, SagaState } from "./saga-duck";
import observableReducer, {
  ObservableState,
  rootEpic
} from "./observable-duck";
import { createEpicMiddleware } from "redux-observable";

export interface ApplicationState {
  thunk: ThunkState;
  saga: SagaState;
  observable: ObservableState;
}

export function createStore() {
  const reducers: {
    [P in keyof ApplicationState]: Reducer<ApplicationState[P]>
  } = {
    thunk: thunkReducer,
    saga: sagaReducer,
    observable: observableReducer
  };

  const sagaMiddleware = createSagaMiddleware();
  const epicMiddleware = createEpicMiddleware();

  const store = reduxCreateStore(
    combineReducers(reducers),
    applyMiddleware(thunk, sagaMiddleware, epicMiddleware, logger) // the order is important
  );

  sagaMiddleware.run(rootSaga);
  epicMiddleware.run(rootEpic);

  return store;
}
