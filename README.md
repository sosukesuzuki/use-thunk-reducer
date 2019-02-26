# useThunkReducer

A Hook that enhanced `useReducer` with like `redux-thunk`.

## Why?

React provides `useReducer`. It make we can use reducer to mange state in React. However, It isn't allow using middleware. So, we cannot use `redux-thunk` with useReducer. So, I implemented new `useReducer` that enhanced with like `redux-thunk`.

## Usage

Implement reducer as same as for normal `useReducer`.

```ts
type State = { count: number };
type Action = { type: "increase"; amount: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increase":
      return { count: state.count + action.amount };
    default:
      throw new Error();
  }
}
```

Declare async action like for `redux-thunk`.(But, second argument is not `getState`.)

```ts
const increaseAsync = (amount: number) => {
  return (dispatch: React.Dispatch<Action>, state: State) => {
    setTimeout(() => {
      console.log(state);
      dispatch({ type: "increase", amount });
    }, 1000);
  };
};
```

Implement Counter component.

```tsx
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
```

## License

MIT
