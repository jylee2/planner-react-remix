import type { MetaFunction } from "remix";
import { useLoaderData, redirect, Link } from "remix";
import { useReducer, useEffect } from 'react'

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import Reducer, { initialState } from "../utils/useStoreReducer";
import { ACTION, ActionType } from "~/types/types";
import { getLoggedInUser } from "~/utils/auth";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader = async ({ request }: ActionType) => {
  const user = await getLoggedInUser(request)
  return user ? { user } : redirect("/auth/login")
}

// https://remix.run/guides/routing#index-routes
export default function HomePage() {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const data = useLoaderData()

  useEffect(() => {
    if (data?.user) {
      dispatch({ type: ACTION.LOGIN, payload: data?.user })
    }
  }, [])

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Remix with TypeScript example
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" sx={{ m: 1 }}>
        {`Welcome back ${state?.loggedInUser?.name}`}
      </Typography>
      <Link to="/about" color="secondary">
        Go to the about page
      </Link>
      <br />
      {
        state?.loggedInUser
          ? <form action="/auth/logout" method="POST">
            <Button variant="outlined" type="submit">
              Logout
            </Button>
          </form>
          : <Link to="/auth/login" color="secondary">
            Login
          </Link>
      }
    </>
  );
}
