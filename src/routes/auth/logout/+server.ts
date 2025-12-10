import { redirect } from "@sveltejs/kit";

export const GET = async ({ cookies }) => {
  cookies.delete("session_id", {
    path: "/",
    sameSite: "lax"
  });

  throw redirect(303, "/");
};
