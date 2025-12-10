import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { quizSessions } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

import { db } from '$lib/db/client';
import { quizQuestions, quizAttempts, quizScores } from '$lib/db/schema';
import { inArray } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const questions = await db.select().from(quizQuestions).limit(5);

    return { questions };
};

export const actions: Actions = {
    submit: async ({ request, locals }) => {

        console.log("QUIZ ACTION RAN");

        if (!locals.user) throw redirect(302, '/login');
        const userId = locals.user.id;

        const formData = await request.formData();
        const entries = [...formData.entries()];

        const answers: { questionId: number; selectedOption: string }[] = [];

        for (const [key, value] of entries) {
            if (key.startsWith('q-')) {
                answers.push({
                    questionId: Number(key.slice(2)),
                    selectedOption: String(value)
                });
            }
        }

        const ids = answers.map(a => a.questionId);
        const rows = await db
            .select()
            .from(quizQuestions)
            .where(inArray(quizQuestions.id, ids));

        let correct = 0;

// 1. Compute score
for (const ans of answers) {
    const q = rows.find(q => q.id === ans.questionId);
    if (!q) continue;

    const isCorrect = ans.selectedOption === q.correctOption;
    if (isCorrect) correct++;
}

console.log(`User ${userId} scored ${correct} out of ${answers.length}`);


// 2. Create session FIRST
const [session] = await db
    .insert(quizSessions)
    .values({
        userId,
        score: correct,
        total: answers.length
    })
    .returning({ id: quizSessions.id });


// 3. Insert attempts WITH sessionId
for (const ans of answers) {
    const q = rows.find(q => q.id === ans.questionId);
    if (!q) continue;

    const isCorrect = ans.selectedOption === q.correctOption;

    await db.insert(quizAttempts).values({
        userId,
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
        sessionId: session.id     // ⭐ REQUIRED
    });
}


// 4. Insert into quizScores (optional)
await db.insert(quizScores).values({
    userId,
    score: correct,
    total: answers.length
});


// 5. Redirect to results page
throw redirect(302, `/result/${session.id}`);
    }
};