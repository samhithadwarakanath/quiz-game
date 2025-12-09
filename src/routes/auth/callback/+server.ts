import type { RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { db } from "$lib/db/client";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (!code) throw redirect(302, "/login");

  // Exchange the authorization code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID ?? "",
      client_secret: env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: env.GOOGLE_REDIRECT_URI ?? "",
      grant_type: "authorization_code",
      code
    })
  });

  const tokenData = await tokenRes.json();
  const idToken = tokenData.id_token;

  if (!idToken) throw redirect(302, "/login");

  const payload = JSON.parse(
    Buffer.from(idToken.split(".")[1], "base64").toString()
  );

  const userId = payload.sub;
  const name = payload.name;
  const email = payload.email;
  const picture = payload.picture;

  // -----------------------------
  // Manual UPSERT for Turso
  // -----------------------------
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  if (existingUser.length > 0) {
    await db.update(users).set({ name, email, picture }).where(eq(users.id, userId));
  } else {
    await db.insert(users).values({
      id: userId,
      name,
      email,
      picture
    });
  }

  // Create session cookie
  cookies.set("session_id", userId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24 * 7
  });

  throw redirect(302, "/");
};
