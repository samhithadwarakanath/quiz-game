<script>
    export let data;

    const session = data.session;
    const incorrect = data.incorrectQuestions;
</script>

<h1>Practice Session</h1>

<p>
    You scored <strong>{session.score}</strong> out of <strong>{session.total}</strong>.
</p>

{#if incorrect.length === 0}
    <p>You got everything correct! 🎉</p>

    <a href="/quiz">
        <button>Take Quiz Again</button>
    </a>
{:else}

    <h2>Questions You Missed</h2>

    {#each incorrect as q}
        <div style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
            <p><strong>Question:</strong> {q.question}</p>

            <p>Your answer: <strong>{q.selectedOption}</strong></p>
            <p>Correct answer: <strong>{q.correctOption}</strong></p>
        </div>
    {/each}

    <br />

    <a href={`/practice/${session.id}/ai`}>
  <button>Generate AI Practice Questions</button>
</a>



    <br /><br />

    <a href="/quiz">
        <button>Take Quiz Again</button>
    </a>

{/if}
