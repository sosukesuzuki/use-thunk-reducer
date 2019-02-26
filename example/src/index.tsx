import * as React from "react";
import * as ReactDOM from "react-dom";
import useThunkReducer from "./use-thunk-reducer";

type State = { count: number };
type Action = { type: "increase"; amount: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increase":
      return { count: state.count - action.amount };
    default:
      throw new Error();
  }
}

const increaseAsync = (amount: number) => {
  return (dispatch: React.Dispatch<Action>, state: State) => {
    setTimeout(() => {
      console.log(state);
      dispatch({ type: "increase", amount });
    }, 1000);
  };
};

const initialState: State = { count: 0 };

function Counter() {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const increaseTwoWithOneSecond = React.useCallback(
    () => dispatch(increaseAsync(2)),
    []
  );
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={increaseTwoWithOneSecond}>
        increase 2 with 1 second
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.querySelector("#root"));
