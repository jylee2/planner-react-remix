import { createCookieSessionStorage, redirect } from "remix";

type LoginFields = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
}

const sessionSecret = process.env.REACT_APP_SESSION_SECRET
if (!sessionSecret) {
  throw new Error('No session secret.')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: process.env.REACT_APP_SESSION_NAME,
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 1 * 60 * 60, // 1 hour
    httpOnly: true
  }
})

export const login = async (fields: LoginFields) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
    method: "POST",
    mode: 'cors',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
    credentials: 'include'
  });

  return response.json();
}

export const createUserSession = async (userUuid: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('uuid', userUuid)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  })
}

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'))
}

export const getLoggedInUser = () => {

}
