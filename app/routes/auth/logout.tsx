import { useEffect, useReducer } from "react";

import { logout } from '~/utils/auth'
import { ACTION, ActionType } from '~/types/types'
import Reducer, { initialState } from "~/utils/useStoreReducer";

export const action = async ({ request }: ActionType) => {
  return logout(request)
}

const Logout = () => {
  const [_, dispatch] = useReducer(Reducer, initialState)

  useEffect(() => {
    dispatch({ type: ACTION.LOGOUT, payload: null })
  }, [])

  return <>Logged out</>
}

export default Logout