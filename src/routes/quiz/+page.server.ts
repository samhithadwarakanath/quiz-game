import type { ServerLoad, Actions } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';

import { db } from '$lib/db/client.js';
import { quizQuestions, quizAttempts, quizScores } from '$lib/db/schema.js';
import { inArray } from 'drizzle-orm';

// ---------------------
// LOAD QUESTIONS
// ---------------------
export const load: ServerLoad = async ({ locals }) => {
    console.log("LOAD USER:", locals.user);

    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const questions = await db.select().from(quizQuestions).limit(5);

    console.log("LOADED QUESTIONS:", questions);

    return { questions };  
};


// ---------------------
// ACTION
// ---------------------
export const actions: Actions = {
    default: async ({ request, locals }) => {
        console.log("QUIZ ACTION RAN");

        if (!locals.user) throw redirect(302, '/login');

        const userId = locals.user.id;

        const formData = await request.formData();
        console.log("FORMDATA:", [...formData.entries()]);

        const answers = [];

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('q-')) {
                answers.push({
                    questionId: Number(key.slice(2)),
                    selectedOption: String(value)
                });
            }
        }

        if (answers.length === 0) {
            return fail(400, { form: { message: "No answers submitted." } });
        }

        // Fetch actual DB questions
        const questionRows = await db
            .select()
            .from(quizQuestions)
            .where(inArray(quizQuestions.id, answers.map(a => a.questionId)));

        let correctCount = 0;

        for (const ans of answers) {
            const q = questionRows.find(q => q.id === ans.questionId);
            if (!q) continue;

            const isCorrect = ans.selectedOption === q.correctOption;
            if (isCorrect) correctCount++;

            await db.insert(quizAttempts).values({
                userId,
                questionId: ans.questionId,
                selectedOption: ans.selectedOption,
                isCorrect
            });
        }

        await db.insert(quizScores).values({
            userId,
            score: correctCount,
            total: answers.length
        });

        // This is what +page.svelte will receive
        return {
            form: {
                message: "Quiz submitted!",
                score: correctCount,
                total: answers.length
            }
        };
    }
};
