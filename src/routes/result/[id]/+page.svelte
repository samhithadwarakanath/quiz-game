<script>
  export let data;
</script>

<div class="container">
  <h1>Quiz Results</h1>

  <div class="score-card">
    <h2>You scored {data.score} / {data.total}</h2>
  </div>

  <h3>Questions You Missed:</h3>

  {#if data.missed.length === 0}
    <p>You got everything correct! 🎉</p>
  {:else}
    {#each data.missed as m}
      <div class="miss-card">
        <p><strong>Question:</strong> {m.question}</p>
        <p><strong>Your Answer:</strong> {m.selectedOption}</p>
        <p><strong>Correct Answer:</strong> {m.correctOption}</p>
      </div>
    {/each}
  {/if}

  <div class="actions">
    <a href="/practice/{data.sessionId}/ai" class="btn primary">Practice With AI</a>
    <a href="/quiz" class="btn">Take Quiz Again</a>
  </div>
</div>
