import { error } from '@sveltejs/kit';
import { db } from '$lib/db/client';
import { quizSessions, quizAttempts, quizQuestions } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
    const sessionId = Number(params.id);

    if (isNaN(sessionId)) {
        throw error(400, 'Invalid session ID');
    }

    // 1. Load the session summary
    const [session] = await db
        .select()
        .from(quizSessions)
        .where(eq(quizSessions.id, sessionId));

    if (!session) {
        throw error(404, 'Practice session not found');
    }

    // 2. Load all attempts for this session
    const attempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.userId, session.userId));

    // 3. Filter only incorrect ones
    const incorrectAttempts = attempts.filter(
  a => a.sessionId === sessionId && !a.isCorrect
);

    // Remove duplicates by questionId
const seen = new Set();
const uniqueIncorrect = incorrectAttempts.filter(att => {
  if (seen.has(att.questionId)) return false;
  seen.add(att.questionId);
  return true;
});



    // 4. Load question details for incorrect questions
    const incorrectQuestions = [];

    for (const attempt of uniqueIncorrect) {
        const [question] = await db
            .select()
            .from(quizQuestions)
            .where(eq(quizQuestions.id, attempt.questionId));

        if (question) {
            incorrectQuestions.push({
                ...question,
                selectedOption: attempt.selectedOption
            });
        }
    }

    return {
        session,
        incorrectQuestions
    };
};
