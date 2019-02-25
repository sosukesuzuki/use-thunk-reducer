import {
  Reducer,
  useReducer,
  ReducerState,
  ReducerAction,
  Dispatch
} from "react";

type Initializer<R extends Reducer<any, any>, I> = (
  arg: I & ReducerState<R> | I
) => ReducerState<R>;
type AsyncAction<S, A> = (dispatch: Dispatch<A>, state: S) => void;
type ThunkDispatch<S, A> = (action: A | AsyncAction<S, A>) => void;

let globalState: any = {};

export default function useThunkReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer?: Initializer<R, I>
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>] {
  type S = ReducerState<R>;
  type A = ReducerAction<R>;

  const [state, dispatch] = initializer
    ? useReducer(reducer, initializerArg, initializer)
    : useReducer(reducer, initializerArg);

  globalState = state;

  const thunkDispatch: ThunkDispatch<S, A> = (action): void | A => {
    if (typeof action === "function") {
      return (action as AsyncAction<S, A>)(dispatch, globalState as S);
    }
    dispatch(action);
  };

  return [state, thunkDispatch];
}
