export type ActionType = {
  request: Request
}

export enum ACTION {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export type ReducerAction = {
  type: ACTION
  payload: any
}

export type ReducerState = {
  loggedInUser: any
  token: any
}