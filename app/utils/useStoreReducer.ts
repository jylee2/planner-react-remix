import { ReducerAction, ReducerState, ACTION } from "~/types/types"

export const initialState: ReducerState = {
  loggedInUser: null,
  token: null,
}

const Reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ACTION.LOGIN:
      return {
        ...state,
        loggedInUser: action.payload
      }
    case ACTION.LOGOUT:
      return {
        ...initialState,
        loggedInUser: null,
        token: null,
      }
    default:
      return state
  }
}

export default Reducer
