import { Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";
import { ISagaModule } from "redux-dynamic-modules-saga";
import { SagaIterator } from "redux-saga";
import { takeLatest, put, delay } from "redux-saga/effects";

interface AuthInfo {
  id: string;
  name: string;
  title: string;
  token: string;
}

const actionCreator = actionCreatorFactory("AUTH");

const login = actionCreator.async<{}, AuthInfo>("LOGIN");

export const loginOperation = actionCreator("LOGIN_OPERATION");

type AuthInfoState = AuthInfo | null;

const authInfoReducer: Reducer<AuthInfoState> = (
  state = null /* FIXME: get from local storage */,
  action
) => {
  if (isType(action, login.done)) {
    return action.payload.result;
  }
  return state;
};

export interface AuthModuleOwnState {
  authInfo: AuthInfoState;
}

function* fetchAuthInfoSaga(): SagaIterator {
  yield put(login.started({}));

  yield delay(500);

  // FIXME: save to local storage
  const result = {
    id: "charlie@example.com",
    name: "Charlie",
    title: "Engineering Manager",
    token: "secret_token"
  }; // mock
  yield put(login.done({ params: {}, result }));
}

function* rootSaga(): SagaIterator {
  yield takeLatest(loginOperation, fetchAuthInfoSaga);
}

export function getAuthModule(): ISagaModule<AuthModuleOwnState> {
  return {
    id: "auth",
    reducerMap: {
      authInfo: authInfoReducer
    },
    sagas: [rootSaga]
  };
}
