import * as React from "react";
import * as ReactDOM from "react-dom";
import useThunkReducer from "./use-thunk-reducer";

type State = { count: number };
type Action = { type: "increment" | "decrement" | "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}

const initialState: State = { count: 0 };

const incrementAsync = () => {
  return (dispatch: React.Dispatch<Action>) => {
    setTimeout(() => {
      dispatch({ type: "increment" });
    }, 1000);
  };
};

function Counter() {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const increment = React.useCallback(
    () => dispatch({ type: "increment" }),
    []
  );
  const incrementWithTime = React.useCallback(
    () => dispatch(incrementAsync()),
    []
  );
  const decrement = React.useCallback(
    () => dispatch({ type: "decrement" }),
    []
  );
  const reset = React.useCallback(() => dispatch({ type: "reset" }), []);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={incrementWithTime}>increment with time</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.querySelector("#root"));
