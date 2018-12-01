import configureMockStore from "redux-mock-store";
import { ApplicationState } from "../index";
import { TestScheduler } from "rxjs/testing";
import {
  countUp,
  delayIncrementActions,
  delayIncrementEpic,
  delayIncrementOperation,
  resetCountActions,
  resetCountEpic,
  resetCountOperation,
  rootEpic
} from "../observable-duck";
import { ActionsObservable, StateObservable } from "redux-observable";

jest.mock("../reset-service");

const mockStore = configureMockStore([]);

describe("actions", () => {
  describe("countUp", () => {
    it("work", async () => {
      const store = mockStore({} as ApplicationState);

      store.dispatch(countUp({ amount: 2 }));

      expect(store.getActions()).toEqual([countUp({ amount: 2 })]);
    });
  });
});

describe("async actions", () => {
  let testScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    testScheduler.flush();
  });

  describe("delayIncrementActions", () => {
    it("work", () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action$ = hot("-a", {
          a: delayIncrementOperation()
        });
        const state$ = null;

        const output$ = delayIncrementEpic(action$, state$, {});

        // at `a` took  1ms
        expectObservable(output$).toBe("-a 249ms b", {
          a: delayIncrementActions.started(),
          b: delayIncrementActions.done({})
        });
      });
    });
  });

  describe("resetCountActions", () => {
    it("triggers `started` then `done` actions by operation if succeeded", () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        require("../reset-service").__config(true, true);
        const resolve = jest.fn();
        const reject = jest.fn();
        let action$ = new ActionsObservable(
          hot("-a", {
            a: resetCountOperation({
              delay: 10,
              promise: {
                resolve,
                reject
              }
            })
          })
        );
        const state$ = new StateObservable<ApplicationState>(cold(""), {
          thunk: { count: 1 },
          saga: { count: 2 },
          observable: { count: 3 }
        });

        const output$ = resetCountEpic(action$, state$, {});

        // at `a` took  1ms
        expectObservable(output$).toBe("-a 9ms b", {
          a: resetCountActions.started({ delay: 10 }),
          b: resetCountActions.done({
            params: { delay: 10 },
            result: {
              quote:
                "Memento from observable. [thunk: 1, saga: 2, observable: 3]"
            }
          })
        });
      });
    });

    it("triggers `started` then `failed` actions by operation if failed", () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        require("../reset-service").__config(false, true);
        const resolve = jest.fn();
        const reject = jest.fn();
        let action$ = new ActionsObservable(
          hot("-a", {
            a: resetCountOperation({
              delay: 10,
              promise: {
                resolve,
                reject
              }
            })
          })
        );
        const state$ = new StateObservable<ApplicationState>(cold(""), {
          thunk: { count: 1 },
          saga: { count: 2 },
          observable: { count: 3 }
        });

        const output$ = resetCountEpic(action$, state$, {});

        // at `a` took  1ms
        expectObservable(output$).toBe("-a 99ms b", {
          a: resetCountActions.started({ delay: 10 }),
          b: resetCountActions.failed({
            params: { delay: 10 },
            error: Error("Mock error")
          })
        });
      });
    });
  });
});
