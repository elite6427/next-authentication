import { NextAuthOptions, VerifyFunction } from "./middlewares/types";
import { authenticate, authorize, logout } from "./middlewares";
import { AuthError } from "./errors";

interface NextAuthObject {
  authenticate: (handler: Function) => Function;
  authorize: (handler: Function) => Function;
  logout: (handler: Function) => Function;
}

function nextAuth({
  verify,
  secret,
  cookieUserOptions = {},
  redirectOnError = true,
  redirectUrl = "/login",
}: NextAuthOptions): NextAuthObject {
  return {
    authenticate: (handler: Function): Function =>
      authenticate(handler, {
        verify,
        secret,
        cookieUserOptions,
      }),
    authorize: (handler: Function): Function =>
      authorize(handler, { secret, redirectOnError, redirectUrl }),
    logout: (handler: Function): Function =>
      logout(handler, { redirectOnError, redirectUrl }),
  };
}

export { nextAuth, AuthError };
