import { redirect } from "@sveltejs/kit";

export const GET = ({ cookies }) => {
  cookies.delete("session_id", {
    path: "/",        // must match cookie set path
  });

  return redirect(302, "/login");
};
