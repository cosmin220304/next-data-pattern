import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export type UserSession = { name: string; isAdmin: boolean };

export const getCurrentUser = cache(async (): Promise<UserSession> => {
  // const token = cookies().get("AUTH_TOKEN");
  // const decodedToken = await decryptAndValidate(token);
  // Don't include secret tokens or private information as public fields.
  // Use classes to avoid accidentally passing the whole object to the client.
  return { name: "cosmin", isAdmin: true };
});

export async function withAuth<T>(
  policy: ((user: UserSession) => boolean) | boolean,
  block: (user: UserSession) => Promise<T>,
): Promise<T | null> {
  const currentUser = await getCurrentUser();
  if (
    (typeof policy === "function" && policy(currentUser)) ||
    policy === true
  ) {
    return block(currentUser);
  }
  return null;
}
