import { actionCreatorFactory, isType, Action as FSA } from "typescript-fsa";
import { Action } from "redux";
import { ApplicationState } from "./index";
import { call, cancelled, delay, put, select, takeEvery } from "redux-saga/effects";
// import { bindAsyncAction } from "typescript-fsa-redux-saga";
// import { SagaIterator } from "redux-saga";
import resetService from "./reset-service";

const actionCreator = actionCreatorFactory("saga");

export const countUp = actionCreator<{ amount: number }>("COUNT_UP");

export const delayIncrementOperation = actionCreator<void>("DELAY_INCREMENT");

export const delayIncrementActions = actionCreator.async<void, void>(
  "DELAY_INCREMENT_ACTIONS"
);

export const resetCountOperation = actionCreator<{
  delay: number;
  promise?: {
    resolve(result: { quote: string }): void;
    reject(error: Error): void;
  };
}>("RESET_COUNT");

export const resetCountActions = actionCreator.async<{ delay: number },
  { quote: string },
  Error>("RESET_COUNT_ACTIONS");

export interface SagaState {
  count: number;
}

const initialState: SagaState = {
  count: 0
};

export default function sagaReducer(
  state: SagaState = initialState,
  action: Action
): SagaState {
  if (isType(action, countUp)) {
    return { ...state, count: state.count + action.payload.amount };
  }
  if (isType(action, delayIncrementActions.done)) {
    return { ...state, count: state.count + 1 };
  }
  if (isType(action, resetCountActions.done)) {
    return { ...state, count: 0 };
  }
  return state;
}

// export const delayIncrementSaga = bindAsyncAction(delayIncrementActions)(
//   () =>
//     new Promise(resolve => {
//       setTimeout(() => {
//         resolve();
//       }, 250);
//     })
// );

export function* delayIncrementSaga() {
  yield put(delayIncrementActions.started());
  yield delay(250);
  yield put(delayIncrementActions.done({}));
}

// export const resetCountSaga = bindAsyncAction(resetCountActions)(function*({
//   delay
// }): SagaIterator {
//   const state = yield select();
//   return yield call(
//     (state: ApplicationState) =>
//       resetService(delay).then(() => ({
//         quote: `Memento from saga. [thunk: ${state.thunk.count}, saga: ${
//           state.saga.count
//         }, observable: ${state.observable.count}]`
//       })),
//     state
//   );
// });

type PayloadOf<Op> = Op extends (params: infer P, ...args: any[]) => any ? P : never;

export function* resetCountSaga(action: FSA<PayloadOf<typeof resetCountOperation>>) {
  const { promise, ...params } = action.payload;
  yield put(resetCountActions.started(params));
  try {
    const resetResult = yield call(resetService, params.delay); // result is not used in this case
    const state: ApplicationState = yield select();
    const result = { quote: `Memento from saga. [thunk: ${state.thunk.count}, saga: ${state.saga.count}, observable: ${state.observable.count}]` };
    yield put(resetCountActions.done({ params, result }));
    promise && promise.resolve(result);
  } catch (error) {
    yield put(resetCountActions.failed({ params, error }));
    promise && promise.reject(error);
  } finally {
    if (yield cancelled()) {
      const error = Error("cancelled");
      yield put(resetCountActions.failed({ params, error }));
      promise && promise.reject(error);
    }
  }
}

// export function* rootSaga() {
//   yield takeEvery(delayIncrementOperation, function* () {
//     yield call(delayIncrementSaga);
//   });
//   yield takeEvery(resetCountOperation, function* (
//     action: FSA<Parameters<typeof resetCountOperation>[0]>
//   ) {
//     try {
//       const { promise, ...coreArgs } = action.payload;
//       const result = yield call(resetCountSaga, coreArgs);
//       action.payload.promise && action.payload.promise.resolve(result);
//     } catch (error) {
//       action.payload.promise && action.payload.promise.reject(error);
//     }
//   });
// }

export function* rootSaga() {
  yield takeEvery(delayIncrementOperation, delayIncrementSaga);
  yield takeEvery(resetCountOperation, resetCountSaga);
}
