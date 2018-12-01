import configureMockStore from "redux-mock-store";
import { ApplicationState } from "../index";
import sagaReducer, {
  countUp,
  delayIncrementActions,
  delayIncrementOperation,
  delayIncrementSaga,
  resetCountActions,
  resetCountOperation,
  resetCountSaga, rootSaga,
  // rootSaga,
  SagaState
} from "../saga-duck";
// import { expectSaga } from "redux-saga-test-plan";
import { testSaga, expectSaga } from "redux-saga-test-plan";

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
  it("run delayIncrementSaga or resetCountSaga by rootSaga", async () => {
    await testSaga(rootSaga).next()
      .takeEvery(delayIncrementOperation, delayIncrementSaga).next()
      .takeEvery(resetCountOperation, resetCountSaga).next()
      .finish()
      .isDone();
  });

  describe("delayIncrementActions", () => {
    // didn't work (`fn` is different)
    // it("runs delayIncrementSaga by rootSaga", async () => {
    //   await expectSaga(rootSaga)
    //     .fork(delayIncrementSaga, delayIncrementOperation())
    //     .dispatch(delayIncrementOperation())
    //     .run();
    // });

    it("triggers `start` then `done` actions in delayIncrementSaga", async () => {
      // let action = delayIncrementOperation();

      // await expectSaga(rootSaga)
      //   .dispatch(action)
      //   .put(delayIncrementActions.started())
      //   .put(
      //     delayIncrementActions.done({
      //       params: undefined,
      //       result: undefined
      //     })
      //   )
      //   .run(300);

      await testSaga(delayIncrementSaga).next()
        .put(delayIncrementActions.started()).next()
        .next() // delay call
        .put(delayIncrementActions.done({})).next()
        .isDone();
    });
  });

  describe("resetCountActions", () => {
    // didn't work (`fn` is different)
    // it("runs resetCountSaga by rootSaga", async () => {
    //   await expectSaga(rootSaga)
    //     .fork(resetCountSaga, resetCountOperation({ delay: 10 }))
    //     .dispatch(resetCountOperation({ delay: 10 }))
    //     .run();
    // });

    it("triggers `started` then `done` actions by operation if succeeded", async () => {
      // require("../reset-service").__config(true);
      // const resolve = jest.fn();
      // const reject = jest.fn();
      // let action = resetCountOperation({
      //   delay: 10,
      //   promise: {
      //     resolve,
      //     reject
      //   }
      // });

      // await expectSaga(rootSaga)
      //   .withState<ApplicationState>({
      //     thunk: { count: 1 },
      //     saga: { count: 2 },
      //     observable: { count: 3 }
      //   })
      //   .dispatch(action)
      //   .put(resetCountActions.started({ delay: 10 }))
      //   .put(
      //     resetCountActions.done({
      //       params: { delay: 10 },
      //       result: {
      //         quote: "Memento from saga. [thunk: 1, saga: 2, observable: 3]"
      //       }
      //     })
      //   )
      //   .run();
      //
      // expect(resolve).toBeCalled();
      // expect(reject).not.toBeCalled();

      const resolve = jest.fn();
      const reject = jest.fn();

      await testSaga(resetCountSaga, resetCountOperation({ delay: 10, promise: { resolve, reject } })).next()
        .put(resetCountActions.started({ delay: 10 })).next()
        .next() // call resetService
        .select().next({
            thunk: { count: 1 },
            saga: { count: 2 },
            observable: { count: 3 }
          }
        )
        .put(resetCountActions.done({
          params: { delay: 10 }, result: { quote: "Memento from saga. [thunk: 1, saga: 2, observable: 3]" }
        })).next()
        .next(false) // cancelled
        .isDone();

      expect(resolve).toBeCalled();
      expect(reject).not.toBeCalled();
    });

    it("triggers `started` then `failed` actions by operation if failed", async () => {
      // require("../reset-service").__config(false);
      // const resolve = jest.fn();
      // const reject = jest.fn();
      // let action = resetCountOperation({
      //   delay: 10,
      //   promise: {
      //     resolve,
      //     reject
      //   }
      // });

      // await expectSaga(rootSaga)
      //   .withState<ApplicationState>({
      //     thunk: { count: 1 },
      //     saga: { count: 2 },
      //     observable: { count: 3 }
      //   })
      //   .dispatch(action)
      //   .put(resetCountActions.started({ delay: 10 }))
      //   .put(
      //     resetCountActions.failed({
      //       params: { delay: 10 },
      //       error: Error("Mock alert!")
      //     })
      //   )
      //   .run();
      //
      // expect(resolve).not.toBeCalled();
      // expect(reject).toBeCalled();

      const resolve = jest.fn();
      const reject = jest.fn();

      await testSaga(resetCountSaga, resetCountOperation({ delay: 10, promise: { resolve, reject } })).next()
        .put(resetCountActions.started({ delay: 10 })).next()
        .throw(Error(`Mock throw!`)) // call resetService
        .put(resetCountActions.failed({ params: { delay: 10 }, error: Error(`Mock throw!`) })).next()
        .next(false) // cancelled
        .isDone();

      expect(resolve).not.toBeCalled();
      expect(reject).toBeCalled();
    });
  });
});

// same with other library
describe("reducer", () => {
  it("returns the initial state", () => {
    const nullAction = { type: "" };

    const result = sagaReducer(undefined, nullAction);

    expect(result).toEqual({
      count: 0
    } as SagaState);
  });

  describe("handles COUNT_UP", () => {
    it("normal case", () => {
      const action = countUp({ amount: 2 });

      const result = sagaReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 3
      } as SagaState);
    });
  });

  describe("handles DELAY_INCREMENT", () => {
    it("normal case", () => {
      let action = delayIncrementActions.done({});

      let result = sagaReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 2
      } as SagaState);
    });
  });

  describe("handles RESET_COUNT", () => {
    it("succeeded case", () => {
      let action = resetCountActions.done({
        params: { delay: 1 },
        result: { quote: "Mock result" }
      });

      let result = sagaReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 0
      } as SagaState);
    });

    it("failed case", () => {
      let action = resetCountActions.failed({
        params: { delay: 1 },
        error: new Error("Mock error")
      });

      let result = sagaReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 1 // do not change count if failed
      } as SagaState);
    });
  });
});
