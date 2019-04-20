import { Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";
import { ISagaModule } from "redux-dynamic-modules-saga";
import { SagaIterator } from "redux-saga";
import { takeLatest, put, delay, select } from "redux-saga/effects";
import { AuthModuleOwnState } from "../auth";

const actionCreator = actionCreatorFactory("CUSTOMERS");

interface Customer {
  id: string;
  name: string;
  saleAccount: number;
}

const fetchCustomers = actionCreator.async<
  { token: string | null },
  Customer[]
>("FETCH_CUSTOMERS");

export const fetchCustomersOperation = actionCreator(
  "FETCH_CUSTOMERS_OPERATION"
);

type State = Customer[] | null;

const reducer: Reducer<State> = (state = null, action) => {
  if (isType(action, fetchCustomers.started)) {
    return null;
  }
  if (isType(action, fetchCustomers.done)) {
    return action.payload.result;
  }
  return state;
};

export interface CustomersModuleOwnState {
  customers: State;
}

// assuming "auth" is loaded globally
type GlobalState = CustomersModuleOwnState & AuthModuleOwnState;

function* fetchCustomersSaga(): SagaIterator {
  const token: string | null = yield select(
    (state: GlobalState) => state.authInfo && state.authInfo.token
  );

  const params = { token };
  yield put(fetchCustomers.started(params));

  yield delay(500);

  if (!token) {
    yield put(fetchCustomers.failed({ params, error: "Invalid Token" }));
    return;
  }

  const result = [
    { id: "1", name: "Foo", saleAccount: 1185 },
    { id: "2", name: "Bar", saleAccount: 1336 },
    { id: "3", name: "Bar", saleAccount: 1603 }
  ]; // mock
  yield put(fetchCustomers.done({ params, result }));
}

function* rootSaga(): SagaIterator {
  yield takeLatest(fetchCustomersOperation, fetchCustomersSaga);
}

export function getCustomersModule(): ISagaModule<CustomersModuleOwnState> {
  return {
    id: "customers",
    reducerMap: {
      customers: reducer
    },
    initialActions: [fetchCustomersOperation()],
    sagas: [rootSaga]
  };
}
