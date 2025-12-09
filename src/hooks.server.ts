import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/db/client";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session_id");



  if (sessionId) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, sessionId));

    event.locals.user = result[0] ?? null;
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
