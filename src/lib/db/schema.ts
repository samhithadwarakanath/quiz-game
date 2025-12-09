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
  isCorrect: integer("isCorrect", { mode: "boolean" }).notNull()
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
