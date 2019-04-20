import { Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";
import { ISagaModule } from "redux-dynamic-modules-saga";
import { SagaIterator } from "redux-saga";
import { takeLatest, put, delay, select } from "redux-saga/effects";
import { AuthModuleOwnState, getAuthModule } from "../auth";
import { IModule } from "redux-dynamic-modules";

interface BossInfo {
  id: string;
  name: string;
  title: string;
}

const actionCreator = actionCreatorFactory("BOSS");

const fetchBossInfo = actionCreator.async<{ token: string | null }, BossInfo>(
  "FETCH_BOSS_INFO"
);

export const fetchBossInfoOperation = actionCreator(
  "FETCH_BOSS_INFO_OPERATION"
);

type BossInfoState = BossInfo | null;

const bossInfoReducer: Reducer<BossInfoState> = (state = null, action) => {
  if (isType(action, fetchBossInfo.done)) {
    return action.payload.result;
  }
  return state;
};

export interface BossModuleOwnState {
  bossInfo: BossInfoState;
}

type GlobalState = BossModuleOwnState & AuthModuleOwnState;

function* fetchBossInfoSaga(): SagaIterator {
  const token: string | null = yield select(
    (state: GlobalState) => state.authInfo && state.authInfo.token
  );

  const params = { token };
  yield put(fetchBossInfo.started(params));

  yield delay(500);

  if (!token) {
    yield put(fetchBossInfo.failed({ params, error: "Invalid Token" }));
    return;
  }

  const result = {
    id: "bob@example.com",
    name: "Bob",
    title: "VPoE"
  }; // mock
  yield put(fetchBossInfo.done({ params, result }));
}

function* rootSaga(): SagaIterator {
  yield takeLatest(fetchBossInfoOperation, fetchBossInfoSaga);
}

function getBossModuleInternal(): ISagaModule<BossModuleOwnState> {
  return {
    id: "boss",
    reducerMap: {
      bossInfo: bossInfoReducer
    },
    initialActions: [fetchBossInfoOperation()],
    sagas: [rootSaga]
  };
}

export function getBossModule(): IModule<unknown>[] {
  // "boss" module depends on "auth" module
  return [getAuthModule(), getBossModuleInternal()];
}
