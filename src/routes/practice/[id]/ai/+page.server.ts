import { error } from '@sveltejs/kit';
import { db } from '$lib/db/client';
import { quizAttempts, quizQuestions } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

import { VertexAI } from "@google-cloud/vertexai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export const load = async ({ params }) => {
    const sessionId = Number(params.id);

    if (isNaN(sessionId)) {
        throw error(400, "Invalid session ID");
    }

    const attempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.sessionId, sessionId));

    const incorrect = attempts.filter(a => !a.isCorrect);

    if (incorrect.length === 0) {
        return {
            explanation: "You got everything correct! 🎉",
            practice_question: null
        };
    }

    const incorrectQuestions = [];
    for (const att of incorrect) {
        const [q] = await db
            .select()
            .from(quizQuestions)
            .where(eq(quizQuestions.id, att.questionId));
        if (q) {
            incorrectQuestions.push({
                question: q.question,
                correctOption: q.correctOption,
                selectedOption: att.selectedOption
            });
        }
    }

    const schema = z.object({
        explanation: z.string(),
        practice_question: z.string()
    });

    const parser = new StructuredOutputParser(schema);
    const format = parser.getFormatInstructions();

    const vertexClient = new VertexAI({
        project: process.env.VERTEX_PROJECT_ID,
        location: process.env.VERTEX_LOCATION
    });

    const generativeModel = vertexClient.getGenerativeModel({
        model: "gemini-2.0-flash"
    });

    const prompt = `
The student answered these questions incorrectly:

${incorrectQuestions.map(q => `
Question: ${q.question}
Student Answer: ${q.selectedOption}
Correct Answer: ${q.correctOption}
`).join("\n")}

Provide:
1. A clear explanation paragraph.
2. ONE simple practice question.

${format}
    `;

    // ---- AI CALL HERE ----
    const result = await generativeModel.generateContent(prompt);

    // Correct extraction:
   const rawText =
    result.response.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";

console.log("RAW TEXT FROM VERTEX:", rawText);

const parsed = await parser.parse(rawText);

console.log("AI OUTPUT:", parsed);

return {
    explanation: parsed.explanation,
    practice_question: parsed.practice_question
};
};
