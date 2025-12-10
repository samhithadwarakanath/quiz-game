import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db/client';
import { quizSessions, quizAttempts, quizQuestions } from '$lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

export const load = async ({ params, locals }) => {
    if (!locals.user) throw redirect(302, "/login");

    const sessionId = Number(params.id);

    if (isNaN(sessionId)) {
        throw error(400, 'Invalid session ID');
    }

    // Fetch the session
    const [session] = await db
        .select()
        .from(quizSessions)
        .where(eq(quizSessions.id, sessionId));

    if (!session) {
        throw error(404, 'Result not found');
    }

    // Fetch all attempts for this session
    const attempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.sessionId, sessionId));

    // Get all related questions
    const questionIds = attempts.map(a => a.questionId);

    const questions = await db
        .select()
        .from(quizQuestions)
        .where(inArray(quizQuestions.id, questionIds));

    // Build a "missed" list
    const missed = attempts
        .map(a => {
            const q = questions.find(q => q.id === a.questionId);
            return {
                question: q?.question,
                selectedOption: a.selectedOption,
                correctOption: q?.correctOption,
                isCorrect: a.isCorrect
            };
        })
        .filter(m => !m.isCorrect);  // only wrong answers

    return {
        score: session.score,
        total: session.total,
        missed,
        sessionId
    };
};
