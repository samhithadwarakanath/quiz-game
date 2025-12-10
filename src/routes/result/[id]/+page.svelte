<script>
  export let data;
</script>

<div
  style="
    min-height: 100vh;
    padding: 2rem;
    background: radial-gradient(circle at top, #1a1a1a 0%, #000 80%);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  "
>
  <h1
    style="
      font-size: 3rem;
      font-weight: 900;
      background: linear-gradient(90deg, #ff4500, #ff1a1a);
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 1rem;
      text-shadow: 0 0 25px rgba(255,60,0,0.3);
    "
  >
    Quiz Results 🏁
  </h1>

  <!-- SCORE BADGE -->
  <div
    style="
      background: rgba(255,255,255,0.05);
      padding: 2rem 3rem;
      border-radius: 20px;
      margin-bottom: 2rem;
      box-shadow: 0 0 25px rgba(255,80,30,0.25);
      border: 1px solid rgba(255,90,40,0.3);
      backdrop-filter: blur(6px);
    "
  >
    <h2 style="font-size: 2rem; margin: 0;">
      You scored 
      <span style="color:#ff4500; font-weight:900;">{data.score}</span>
      /
      <span style="color:#ff1a1a; font-weight:900;">{data.total}</span>
    </h2>
  </div>

  <!-- MISSED QUESTIONS -->
  <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">Questions You Missed:</h3>

  {#if data.missed.length === 0}
    <p style="font-size: 1.2rem; opacity: 0.8;">You got everything correct! 🎉</p>
  {:else}
    {#each data.missed as m}
      <div
        style="
          background: rgba(255,255,255,0.06);
          margin: 1rem 0;
          padding: 1.5rem;
          width: min(600px, 90%);
          text-align: left;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(255,80,30,0.2);
          border: 1px solid rgba(255,90,40,0.25);
        "
      >
        <p><strong>Question:</strong> {m.question}</p>
        <p><strong>Your Answer:</strong> {m.selectedOption}</p>
        <p><strong>Correct Answer:</strong> {m.correctOption}</p>
      </div>
    {/each}
  {/if}

  <!-- ACTION BUTTONS -->
  <div
    style="
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    "
  >
    <a
      href="/practice/{data.sessionId}/ai"
      style="
        background: linear-gradient(90deg, #ff4500, #ff1a1a);
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2rem;
        box-shadow: 0 0 20px rgba(255,60,0,0.5);
        transition: transform 0.2s ease;
      "
      on:mouseover={(e) => (e.target.style.transform = 'scale(1.05)')}
      on:mouseout={(e) => (e.target.style.transform = 'scale(1)')}
    >
      Practice With AI 🤖
    </a>

    <a
      href="/quiz"
      style="
        background: #333;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2rem;
        border: 1px solid rgba(255,90,40,0.4);
        transition: transform 0.2s ease;
      "
      on:mouseover={(e) => (e.target.style.transform = 'scale(1.05)')}
      on:mouseout={(e) => (e.target.style.transform = 'scale(1)')}
    >
      Take Quiz Again ↺
    </a>
  </div>
</div>
