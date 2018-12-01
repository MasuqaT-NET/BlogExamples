// import {
//   ActionCreator,
//   actionCreatorFactory,
//   isType,
//   Action as FSA
// } from "typescript-fsa";
import { actionCreatorFactory, isType } from "typescript-fsa";
import { Action } from "redux";
import { ApplicationState } from "./index";
import { combineEpics, Epic } from "redux-observable";
import {
  catchError,
  delay,
  filter,
  map,
  mapTo,
  mergeMap,
  tap
} from "rxjs/operators";
// import { from, merge, Observable, of, OperatorFunction } from "rxjs";
import { from, merge, of } from "rxjs";
import resetService from "./reset-service";

// const ofAction = <P>(
//   actionCreator: ActionCreator<P>
// ): OperatorFunction<FSA<unknown>, FSA<P>> => (actions$): Observable<FSA<P>> =>
//   actions$.pipe(filter(actionCreator.match));

const actionCreator = actionCreatorFactory("observable");

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

export interface ObservableState {
  count: number;
}

const initialState: ObservableState = {
  count: 0
};

export default function observableReducer(
  state: ObservableState = initialState,
  action: Action
): ObservableState {
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

export const delayIncrementEpic: Epic<Action> = action$ =>
  action$.pipe(
    // ofAction(delayIncrementOperation),
    filter(delayIncrementOperation.match),
    mergeMap(() =>
      merge(
        of(delayIncrementActions.started()),
        of({}).pipe(
          delay(250),
          mapTo(delayIncrementActions.done({}))
        )
      )
    )
  );

export const resetCountEpic: Epic<Action, Action, ApplicationState> = (
  action$,
  state$
) =>
  action$.pipe(
    // ofAction(resetCountOperation),
    filter(resetCountOperation.match),
    mergeMap(action =>
      merge(
        (() => {
          const { promise, ...coreArgs } = action.payload;
          return of(resetCountActions.started(coreArgs));
        })(),
        from(resetService(action.payload.delay).then(() => {
          const state = state$.value;
          return {
            quote: `Memento from observable. [thunk: ${
              state.thunk.count
              }, saga: ${state.saga.count}, observable: ${
              state.observable.count
              }]`
          };
        })).pipe(
          map(result => {
            const { promise, ...params } = action.payload;
            return resetCountActions.done({ params, result });
          }),
          tap(doneAction => {
            action.payload.promise &&
            action.payload.promise.resolve(doneAction.payload.result);
          }),
          catchError(error =>
            of(
              (() => {
                const { promise, ...params } = action.payload;
                return resetCountActions.failed({ params, error });
              })()
            ).pipe(
              tap(failAction => {
                action.payload.promise &&
                action.payload.promise.reject(failAction.payload.error);
              })
            )
          )
        )
      )
    )
  );

export const rootEpic = combineEpics(delayIncrementEpic, resetCountEpic);
