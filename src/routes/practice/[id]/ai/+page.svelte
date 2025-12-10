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
      font-size: 2.8rem;
      font-weight: 900;
      background: linear-gradient(90deg, #ff4500, #ff1a1a);
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 2rem;
      text-shadow: 0 0 20px rgba(255,60,0,0.3);
    "
  >
    AI Learning Assistant 🤖
  </h1>

  <!-- EXPLANATION CARD -->
  <div
    style="
      background: rgba(255,255,255,0.06);
      padding: 1.8rem;
      border-radius: 15px;
      width: min(700px, 90%);
      text-align: left;
      margin-bottom: 2rem;
      border: 1px solid rgba(255,70,40,0.3);
      box-shadow: 0 0 20px rgba(255,70,40,0.25);
      backdrop-filter: blur(6px);
    "
  >
    <h2
      style="
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
        color: #ff4500;
      "
    >
      Explanation
    </h2>

    <p style="font-size: 1.15rem; opacity: 0.85;">
      {data.explanation}
    </p>
  </div>

  <!-- PRACTICE QUESTION CARD -->
  {#if data.practice_question}
    <div
      style="
        background: rgba(255,255,255,0.06);
        padding: 1.8rem;
        border-radius: 15px;
        width: min(700px, 90%);
        text-align: left;
        margin-bottom: 2rem;
        border: 1px solid rgba(255,70,40,0.3);
        box-shadow: 0 0 20px rgba(255,70,40,0.25);
        backdrop-filter: blur(6px);
      "
    >
      <h2
        style="
          font-size: 1.6rem;
          margin-bottom: 0.8rem;
          color: #ff1a1a;
        "
      >
        Practice Question
      </h2>

      <p style="font-size: 1.15rem; opacity: 0.9;">
        {data.practice_question}
      </p>
    </div>
  {/if}

  <!-- BUTTONS -->
  <div style="margin-top: 2rem;">
    <a
      href="/quiz"
      style="
        background: linear-gradient(90deg, #ff4500, #ff1a1a);
        padding: 1rem 2.5rem;
        border-radius: 12px;
        font-size: 1.3rem;
        font-weight: 800;
        color: white;
        text-decoration: none;
        box-shadow: 0 0 25px rgba(255,60,0,0.5);
        transition: transform 0.2s ease;
      "
      on:mouseover={(e) => (e.target.style.transform = 'scale(1.05)')}
      on:mouseout={(e) => (e.target.style.transform = 'scale(1)')}
    >
      Take Another Quiz →
    </a>
  </div>
</div>
