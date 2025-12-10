# Quiz Game

A small SvelteKit-based quiz application that includes a server-side AI-powered practice helper. The AI feature analyzes a user's incorrect quiz attempts and generates a clear explanation plus a single practice question tailored to the user's mistakes using Google Vertex AI.

## Highlights

- Built with SvelteKit + Vite
- Uses Drizzle ORM for SQL schema and migrations (see `drizzle/` and `drizzle.config.ts`)
- Automated tests with Playwright and Vitest
- Integrates with Google Vertex AI (Gemini) for targeted practice generation



## Deployment

- Live demo: https://quiz-game-beta-dun.vercel.app/
- Deployed on Vercel — make sure required environment variables (see "Environment variables") are configured in your Vercel project settings.

## AI Feature — at a glance

- Route: `src/routes/practice/[id]/ai/+page.server.ts`
- What it does: fetches a user's quiz attempts for a session, collects the incorrectly answered questions, and sends a structured prompt to Vertex AI. The model returns a short explanation and exactly one practice question.
- Model: `gemini-2.0-flash` (configured in the server file)
- Parser: Uses `zod` + `StructuredOutputParser` (from LangChain) to produce a reliably-structured response.

Contract (inputs/outputs)
- Inputs: session id (route param) — server loads quiz attempts and related questions from DB
- Outputs: JSON containing:
  - `explanation` (string)
  - `practice_question` (string | null)

Edge cases
- If the session id is invalid => 400 error
- If there are no incorrect answers => returns a friendly message and no practice question
- The server writes Vertex credentials to `/tmp/vertex-key.json` and sets `GOOGLE_APPLICATION_CREDENTIALS` so the Vertex SDK can authenticate

## Environment variables

Required for AI feature to work:

- `VERTEX_KEY_JSON` — the Vertex service account JSON as a single-line string (the server writes this to `/tmp/vertex-key.json` at runtime)
- `VERTEX_PROJECT_ID` — GCP project id
- `VERTEX_LOCATION` — Vertex AI location (example: `us-central1`)

Optional / general envs:

- Any other envs used by your DB or deployment

Important note: the helper function `ensureVertexCredentialsFile()` (in `src/lib/server/vertex-creds.server.ts`) will throw if `VERTEX_KEY_JSON` is missing. On server environments such as Vercel we write the key to `/tmp` and set `GOOGLE_APPLICATION_CREDENTIALS`.

## How the AI call works (summary)

1. Server loads incorrect attempts from the database (Drizzle) for the given session id.
2. Constructs a prompt that includes the incorrectly answered questions and the expected structured output format (from `StructuredOutputParser`).
3. Calls VertexAI generative model (`gemini-2.0-flash`) and receives predicted content.
4. Extracts raw text from Vertex response, parses it with the StructuredOutputParser and returns `explanation` and `practice_question` to the page.

Key source locations
- AI load logic: `src/routes/practice/[id]/ai/+page.server.ts`
- Vertex creds helper: `src/lib/server/vertex-creds.server.ts`
- DB client & schema: `src/lib/db/client.ts`, `src/lib/db/schema.ts`

## Architecture diagram

The following Mermaid diagram shows the main components and how data flows when a user requests the AI practice for a session.

```mermaid
flowchart TD
  Browser[User Browser]
  Browser -->|Visit /practice/:id| SvelteKit[Frontend (SvelteKit)]
  SvelteKit -->|server load| PracticeAI[/practice/:id/ai load]
  PracticeAI -->|reads attempts| DB[(Drizzle DB)]
  PracticeAI -->|ensure creds| VertexCreds[ensureVertexCredentialsFile]
  PracticeAI -->|generative request| Vertex[Google Vertex AI]
  Vertex -->|response| PracticeAI
  PracticeAI -->|returns| SvelteKit
  SvelteKit --> Browser

  subgraph Tests
    Playwright[Playwright e2e]
    Vitest[Unit tests (Vitest)]
  end
  Playwright --> SvelteKit
  Vitest --> src

  subgraph Repo Files
    A[src/routes/*]
    B[src/lib/db/*]
    C[drizzle/* migrations]
  end

  DB -.-> C
  SvelteKit -.-> A
  SvelteKit -.-> B
```

If you prefer a quick ASCII view:

Browser -> SvelteKit (routes) -> /practice/:id/ai (server)
  -> DB (read attempts/questions)
  -> ensureVertexCredentialsFile -> Vertex AI
  <- Vertex AI response -> parse -> return explanation + practice question

## Video

https://youtu.be/WtaCAVOb4DE

  

## Local development

1. Install dependencies

```bash
npm install
```

2. Add environment variables (example `.env` or set in the host):

```
VERTEX_KEY_JSON="<raw JSON content for service account key>"
VERTEX_PROJECT_ID="your-project-id"
VERTEX_LOCATION="us-central1"
```

3. Start dev server

```bash
npm run dev
```

4. Database tasks

- Push/generate/migrate with drizzle-kit (see scripts in `package.json`):

```bash
npm run db:push
npm run db:migrate
```

5. Tests

- Unit: `npm run test:unit`
- End-to-end: `npm run test:e2e` (Playwright)

## Security & deployment notes

- Treat `VERTEX_KEY_JSON` like a secret. Do not commit it. Provide it via your host's secret management.
- On serverless platforms (Vercel, Netlify), `ensureVertexCredentialsFile()` writes credentials to `/tmp` and sets `GOOGLE_APPLICATION_CREDENTIALS` so the Google SDK will find them.

## Troubleshooting

- If the AI returns unstructured text, check that `StructuredOutputParser` format instructions are being included in the prompt. The server code already inserts `format` instructions.
- If you see auth errors from the Vertex SDK, confirm `VERTEX_KEY_JSON` is valid JSON and `VERTEX_PROJECT_ID`/`VERTEX_LOCATION` are set.

## Where to look in code

- AI implementation and parsing: `src/routes/practice/[id]/ai/+page.server.ts`
- Vertex credentials helper: `src/lib/server/vertex-creds.server.ts`
- DB models and queries: `src/lib/db/schema.ts`, `src/lib/db/client.ts`



Happy to expand any section or add visual assets. 
# sv


## Author

- GitHub: `samhithadwarakanath`


