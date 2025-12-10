import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* -------------------------
   USERS TABLE
-------------------------- */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),     // Google user ID
  name: text("name").notNull(),
  email: text("email").notNull(),
  picture: text("picture")         // optional profile picture
});

/* -------------------------
   QUIZ QUESTIONS
-------------------------- */
export const quizQuestions = sqliteTable("quiz_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  optionA: text("optionA").notNull(),
  optionB: text("optionB").notNull(),
  optionC: text("optionC").notNull(),
  optionD: text("optionD").notNull(),
  correctOption: text("correctOption").notNull(), // "A", "B", "C", "D"
  createdBy: text("createdBy")                     // user ID if admin added
});

/* -------------------------
   QUIZ ATTEMPTS
-------------------------- */
export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId").notNull(),
  questionId: integer("questionId").notNull(),
  selectedOption: text("selectedOption").notNull(),
  isCorrect: integer("isCorrect", { mode: "boolean" }).notNull(),
  sessionId: integer('session_id').notNull(),

});

/* -------------------------
   QUIZ SCORES
-------------------------- */
export const quizScores = sqliteTable("quiz_scores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull()
});

/* -------------------------
   QUIZ SESSIONS
-------------------------- */
export const quizSessions = sqliteTable('quiz_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  score: integer('score').notNull(),
  total: integer('total').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
});

/* -------------------------
   AUTH SESSIONS (LOGIN)
-------------------------- */
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),         // UUID session token
  userId: text('userId').notNull(),    // reference to users.id
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
});
