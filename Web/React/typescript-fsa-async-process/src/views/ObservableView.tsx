import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../modules";
import { bindActionCreators, Dispatch } from "redux";
import {
  countUp,
  delayIncrementOperation,
  resetCountOperation
} from "../modules/observable-duck";

const mapStateToProps = (applicationState: ApplicationState) => ({
  count: applicationState.observable.count
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      countUp,
      delayIncrementOperation,
      resetCountOperation
    },
    dispatch
  );

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export class ObservableView extends React.Component<MappedProps> {
  public render() {
    return (
      <div>
        <h1>Observable Version</h1>
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
          onClick={() =>
            new Promise<{ quote: string }>((resolve, reject) => {
              this.props.resetCountOperation({
                delay: 500,
                promise: { resolve, reject }
              });
            }).then(result => {
              console.log(result.quote);
            })
          }
        >
          Reset in 0.5s
        </button>
        <button
          onClick={() =>
            new Promise((resolve, reject) => {
              this.props.resetCountOperation({
                delay: 1500,
                promise: { resolve, reject }
              });
            }).catch(error => {
              alert(error.message);
            })
          }
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
)(ObservableView);
