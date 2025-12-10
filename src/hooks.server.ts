import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/db/client";
import { users, sessions } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session_id");

  if (sessionId) {
    // 1. Look up login session
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId));

    if (session.length > 0) {
      // 2. Load user attached to that session
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session[0].userId));

      event.locals.user = user[0] ?? null;
    } else {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};
