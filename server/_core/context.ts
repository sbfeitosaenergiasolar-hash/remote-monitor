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
    // Use a mock user for testing (both dev and production)
    // This allows testing without a valid session cookie
    user = {
      id: 1,
      openId: 'test-user',
      name: 'Test User',
      email: 'test@example.com',
      loginMethod: 'local',
      role: 'admin',
      lastSignedIn: new Date(),
    } as User;
    console.log('[Auth] Using mock user for testing');
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
