import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../modules";
import { bindActionCreators, Dispatch } from "redux";
import {
  countUp,
  delayIncrementOperation,
  resetCountOperation
} from "../modules/thunk-duck";
import { thunkToAction } from "typescript-fsa-redux-thunk";

const mapStateToProps = (applicationState: ApplicationState) => ({
  count: applicationState.thunk.count
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      countUp,
      delayIncrementOperation: thunkToAction(delayIncrementOperation.action),
      resetCountOperation: thunkToAction(resetCountOperation.action)
    },
    dispatch
  );

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export class ThunkView extends React.Component<MappedProps> {
  public render() {
    return (
      <div>
        <h1>Thunk Version</h1>
        <span>{this.props.count}</span>
        <button
          onClick={() => {
            this.props.countUp({ amount: 2 });
          }}
        >
          2 Up
        </button>
        <button
          onClick={() => {
            this.props.delayIncrementOperation();
          }}
        >
          1 Up in 0.25s
        </button>
        <button
          onClick={() => {
            this.props.resetCountOperation({ delay: 0 });
          }}
        >
          Reset in 0s
        </button>
        <button
          onClick={() => {
            this.props.resetCountOperation({ delay: 500 }).then(result => {
              console.log(result.quote);
            });
          }}
        >
          Reset in 0.5s
        </button>
        <button
          onClick={() => {
            this.props.resetCountOperation({ delay: 1500 }).catch(error => {
              alert(error.message);
            });
          }}
        >
          Reset in 1.5s
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThunkView);
