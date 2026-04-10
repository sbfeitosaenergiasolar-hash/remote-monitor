import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    // In development, use a mock user for testing
    if (process.env.NODE_ENV !== 'production') {
      user = {
        id: 1,
        openId: 'dev-user',
        name: 'Developer',
        email: 'dev@example.com',
        loginMethod: 'local',
        role: 'admin',
        lastSignedIn: new Date(),
      } as User;
    } else {
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
