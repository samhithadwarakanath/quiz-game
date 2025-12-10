import { env } from "$env/dynamic/private";
import fs from "fs";

const CREDS_PATH = "/tmp/vertex-key.json";

/**
 * Ensures Vertex AI JSON credentials exist as a file on Vercel.
 * Writes the VERTEX_KEY_JSON env var into /tmp and sets
 * GOOGLE_APPLICATION_CREDENTIALS so the SDK can load it.
 */
export function ensureVertexCredentialsFile() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return; // Already set
  }

  if (!env.VERTEX_KEY_JSON) {
    throw new Error("VERTEX_KEY_JSON is missing in environment variables");
  }

  // Write JSON key to /tmp if not already created
  if (!fs.existsSync(CREDS_PATH)) {
    fs.writeFileSync(CREDS_PATH, env.VERTEX_KEY_JSON);
  }

  // Tell Google SDK where to find the credentials
  process.env.GOOGLE_APPLICATION_CREDENTIALS = CREDS_PATH;
}
