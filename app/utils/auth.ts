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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
    credentials: 'include'
  });

  return response.json();
}

export const createUserSession = async (userUuid: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('userUuid', userUuid)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  })
}

const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'))
}

export const getLoggedInUser = async (request: Request) => {
  const session = await getUserSession(request)
  const userUuid = session.get('userUuid')
  if (!userUuid || typeof userUuid !== 'string') {
    return null
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${userUuid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
  
    return response.json();
  } catch (error) {
    console.log('--------getLoggedInUser error: ', error)
  }
}
