import { actionCreatorFactory, isType } from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { Action } from "redux";
import { ApplicationState } from "./index";
import resetService from "./reset-service";

const actionCreator = actionCreatorFactory("thunk");
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const countUp = actionCreator<{ amount: number }>("COUNT_UP");

export const delayIncrementOperation = asyncActionCreator<void, void>(
  "DELAY_INCREMENT",
  () => new Promise(resolve => setTimeout(() => resolve(), 250))
);

export const resetCountOperation = asyncActionCreator<{ delay: number },
  { quote: string },
  Error>("RESET_COUNT", ({ delay }, dispatch, getState) =>
  resetService(delay).then(() => {
    const state = getState();
    return {
      quote: `Memento from thunk. [thunk: ${state.thunk.count}, saga: ${
        state.saga.count
        }, observable: ${state.observable.count}]`
    };
  })
);

export interface ThunkState {
  count: number;
}

const initialState: ThunkState = {
  count: 0
};

export default function thunkReducer(
  state: ThunkState = initialState,
  action: Action
): ThunkState {
  if (isType(action, countUp)) {
    return { ...state, count: state.count + action.payload.amount };
  }
  if (isType(action, delayIncrementOperation.async.done)) {
    return { ...state, count: state.count + 1 };
  }
  if (isType(action, resetCountOperation.async.done)) {
    return { ...state, count: 0 };
  }
  return state;
}
