<script>
  export let data;
</script>

<div class="container">
  <h1>AI Learning Assistant</h1>

  <div class="card">
    <h2>Explanation</h2>
    <p>{data.explanation}</p>
  </div>

  {#if data.practice_question}
    <div class="card">
      <h2>Practice Question</h2>
      <p>{data.practice_question}</p>
    </div>
  {/if}

  <div class="actions">
    <a href="/quiz" class="btn">Take Another Quiz</a>
  </div>
</div>

<style>
  .container {
    max-width: 700px;
    margin: 2rem auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .card {
    background: #fafafa;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .actions {
    text-align: center;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.75rem 1.25rem;
    background: #0d6efd;
    color: white;
    border-radius: 6px;
    text-decoration: none;
  }
</style>
