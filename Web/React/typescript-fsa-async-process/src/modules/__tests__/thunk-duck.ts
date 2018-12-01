import configureMockStore from "redux-mock-store";
import thunkReducer, {
  countUp,
  delayIncrementOperation,
  resetCountOperation,
  ThunkState
} from "../thunk-duck";
import thunk from "redux-thunk";
import { ApplicationState } from "../index";

jest.mock("../reset-service");

const mockStore = configureMockStore([thunk]);

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
  describe("delayIncrementActions", () => {
    it("work", async () => {
      const store = mockStore({} as ApplicationState);

      await store.dispatch(delayIncrementOperation.action());

      expect(store.getActions()).toEqual([
        delayIncrementOperation.async.started(),
        delayIncrementOperation.async.done({})
      ]);
    });
  });

  describe("resetCountActions", () => {
    it("return memento if succeeded", async () => {
      require("../reset-service").__config(true);
      const store = mockStore({
        thunk: { count: 1 },
        saga: { count: 2 },
        observable: { count: 3 }
      } as ApplicationState);

      await expect(
        store.dispatch(resetCountOperation.action({ delay: 4 }))
      ).resolves.toEqual({
        quote: "Memento from thunk. [thunk: 1, saga: 2, observable: 3]"
      });

      expect(store.getActions()).toEqual([
        resetCountOperation.async.started({ delay: 4 }),
        resetCountOperation.async.done({
          params: { delay: 4 },
          result: {
            quote: "Memento from thunk. [thunk: 1, saga: 2, observable: 3]"
          }
        })
      ]);
    });

    it("return error if failed", async () => {
      require("../reset-service").__config(false);
      const store = mockStore({
        thunk: { count: 1 },
        saga: { count: 2 },
        observable: { count: 3 }
      } as ApplicationState);

      await expect(
        store.dispatch(resetCountOperation.action({ delay: 4 }))
      ).rejects.toThrow("Mock alert!");

      expect(store.getActions()).toEqual([
        resetCountOperation.async.started({ delay: 4 }),
        resetCountOperation.async.failed({
          params: { delay: 4 },
          error: Error("Mock alert!") // should keep the same
        })
      ]);
    });
  });
});

// same with other library
describe("reducer", () => {
  it("returns the initial state", () => {
    const nullAction = { type: "" };

    const result = thunkReducer(undefined, nullAction);

    expect(result).toEqual({
      count: 0
    } as ThunkState);
  });

  describe("handles COUNT_UP", () => {
    it("normal case", () => {
      const action = countUp({ amount: 2 });

      const result = thunkReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 3
      } as ThunkState);
    });
  });

  describe("handles DELAY_INCREMENT", () => {
    it("normal case", () => {
      let action = delayIncrementOperation.async.done({});

      let result = thunkReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 2
      } as ThunkState);
    });
  });

  describe("handles RESET_COUNT", () => {
    it("succeeded case", () => {
      let action = resetCountOperation.async.done({
        params: { delay: 1 },
        result: { quote: "Mock result" }
      });

      let result = thunkReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 0
      } as ThunkState);
    });

    it("failed case", () => {
      let action = resetCountOperation.async.failed({
        params: { delay: 1 },
        error: new Error("Mock error")
      });

      let result = thunkReducer({ count: 1 }, action);

      expect(result).toEqual({
        count: 1 // do not change count if failed
      } as ThunkState);
    });
  });
});
