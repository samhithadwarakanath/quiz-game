<script lang="ts">
  export let data: {
    questions?: any[];
    form?: { message?: string; score?: number; total?: number };
  };
</script>

<h1>Quiz</h1>

{#if data.form}
  <div class="results">
    <h2>{data.form.message}</h2>
    <p>Your Score: <strong>{data.form.score}</strong> / {data.form.total}</p>

    <a href="/" class="home-btn">Home →</a>
    <br />
    <a href="/quiz" class="retry-btn">Try Again →</a>
  </div>

{:else}

  {#if !data.questions || data.questions.length === 0}
    <p>No questions available.</p>

  {:else}
    <form method="POST">

      {#each data.questions as q, index}
        <fieldset class="question-block">
          <legend>{index + 1}. {q.question}</legend>

          <label>
            <input type="radio" name={`q-${q.id}`} value="A" required />
            {q.optionA}
          </label>

          <label>
            <input type="radio" name={`q-${q.id}`} value="B" />
            {q.optionB}
          </label>

          <label>
            <input type="radio" name={`q-${q.id}`} value="C" />
            {q.optionC}
          </label>

          <label>
            <input type="radio" name={`q-${q.id}`} value="D" />
            {q.optionD}
          </label>
        </fieldset>
      {/each}

      <button type="submit" class="submit-btn">Submit Quiz</button>
    </form>
  {/if}

{/if}
