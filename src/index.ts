import {
  Reducer,
  useReducer,
  ReducerState,
  ReducerAction,
  Dispatch
} from "react";

type AsyncAction<S, A> = (dispatch: Dispatch<A>, state: S) => A;
type ThunkDispatch<S, A> = (action: A | AsyncAction<S, A>) => void | A;

let globalState: any = {};

export function useThunkReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
) {
  type S = ReducerState<R>;
  type A = ReducerAction<R>;

  const [state, dispatch] = useReducer(reducer, initializerArg, initializer);

  globalState = state;

  const thunkDispatch: ThunkDispatch<S, A> = (action): void | A => {
    if (typeof action === "function") {
      return (action as AsyncAction<S, A>)(dispatch, globalState as S);
    }
    dispatch(action);
  };

  return [state, thunkDispatch];
}
