import { ServerResponse } from "http";
import { setCookie } from "../cookies";
import { encrypt, parseBody } from "../utils";
import { NextAuthRequest, AuthenticateOptions } from "./types";
import { AuthError } from "../errors";

const authenticate = (
  handler: Function,
  options: AuthenticateOptions
) => async (
  req: NextAuthRequest,
  res: ServerResponse
): Promise<Function | undefined> => {
  const { cookieUserOptions, secret, verify } = options;
  const cookieDefaultOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  };

  const cookieOptions = {
    ...cookieDefaultOptions,
    cookieUserOptions,
  };

  try {
    // `req.body` comes parsed using API middleware. But in case the user
    // turned off the parsing option, we run our own parser.
    // https://nextjs.org/docs/api-routes/api-middlewares

    const { username, password } = req.body ?? (await parseBody(req));

    if (!username || !password) {
      throw new AuthError("Missing credentials");
    }

    const user = await verify(username, password);
    const token = encrypt(user, secret);

    setCookie(res, token, cookieOptions);

    return handler(req, res);
  } catch (error) {
    res.statusCode = error.status ?? 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error.message }));
  }
};

export { authenticate };
