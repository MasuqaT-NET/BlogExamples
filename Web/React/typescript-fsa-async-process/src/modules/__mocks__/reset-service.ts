import { of, throwError } from "rxjs";
import { delay as rxDelay, mergeMap } from "rxjs/operators";

let _willSuccess = true;
let _for_observable = false;

export function __config(willSuccess: boolean, for_observable?: boolean) {
  _willSuccess = willSuccess;
  _for_observable = for_observable;
}

export default (delay: number) => {
  return _for_observable
    ? _willSuccess
      ? {
        then(onfulfilled: () => any) {
          return of(onfulfilled()).pipe(rxDelay(delay));
        }
      }
      : {
        then() {
          return of(null).pipe(
            rxDelay(100),
            mergeMap(_ => throwError(Error(`Mock error`)))
          );
        }
      }
    : _willSuccess ? Promise.resolve() : Promise.reject(Error(`Mock alert!`));
};
