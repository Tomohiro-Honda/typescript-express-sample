import { getToken, userAuthenticate } from '../lib/auth/auth.js';

export const loginService = async (email: string, password: string) => {
  const user = await userAuthenticate(email, password);

  if (user === null) {
    return null;
  } else if (user === undefined) {
    return { user: undefined, token: undefined };
  }

  const token = getToken(email);
  return { user: user, token: token };
};
