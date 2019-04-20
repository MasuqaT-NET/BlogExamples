import { Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";
import { ISagaModule } from "redux-dynamic-modules-saga";
import { SagaIterator } from "redux-saga";
import { takeLatest, put, delay, select } from "redux-saga/effects";
import { AuthModuleOwnState } from "../auth";

const actionCreator = actionCreatorFactory("EMPLOYEES");

interface Employee {
  id: string;
  name: string;
  title: string;
}

const fetchEmployees = actionCreator.async<
  { token: string | null },
  Employee[]
>("FETCH_EMPLOYEES");

export const fetchEmployeesOperation = actionCreator(
  "FETCH_EMPLOYEES_OPERATION"
);

type State = Employee[] | null;

const reducer: Reducer<State> = (state = null, action) => {
  if (isType(action, fetchEmployees.done)) {
    return action.payload.result;
  }
  return state;
};

export interface EmployeesModuleOwnState {
  employees: State;
}

// assuming "auth" is loaded globally
type GlobalState = EmployeesModuleOwnState & AuthModuleOwnState;

function* fetchEmployeesSaga(): SagaIterator {
  const token: string | null = yield select(
    (state: GlobalState) => state.authInfo && state.authInfo.token
  );

  const params = { token };
  yield put(fetchEmployees.started(params));

  yield delay(500);

  if (!token) {
    yield put(fetchEmployees.failed({ params, error: "Invalid Token" }));
    return;
  }

  const result = [
    { id: "alice@example.com", name: "Alice", title: "CEO" },
    { id: "bob@example.com", name: "Bob", title: "VPoE" },
    { id: "charlie@example.com", name: "Charlie", title: "Engineering Manager" }
  ]; // mock
  yield put(fetchEmployees.done({ params, result }));
}

function* rootSaga(): SagaIterator {
  yield takeLatest(fetchEmployeesOperation, fetchEmployeesSaga);
}

export function getEmployeesModule(): ISagaModule<EmployeesModuleOwnState> {
  return {
    id: "employees",
    reducerMap: {
      employees: reducer
    },
    initialActions: [fetchEmployeesOperation()],
    sagas: [rootSaga]
  };
}
