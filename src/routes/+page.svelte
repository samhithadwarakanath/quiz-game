<script lang="ts">
  export let data;
  const user = data.user;

  const logout = () => {
    window.location.href = "/auth/logout";
  };
</script>

<div
  style="
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(circle at top, #1a1a1a 0%, #000 80%);
    color: white;
    padding: 2rem;
  "
>
  <h1
    style="
      font-size: 3rem;
      margin-bottom: 0.5rem;
      font-weight: 900;
      background: linear-gradient(90deg, #ff4500, #ff1a1a);
      -webkit-background-clip: text;
      color: transparent;
      text-shadow: 0 0 25px rgba(255, 60, 0, 0.3);
    "
  >
    Welcome, {user.name} 🏍️
  </h1>

  <p
    style="
      font-size: 1.2rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    "
  >
    {user.email}
  </p>

  <a
    href="/quiz"
    style="
      background: linear-gradient(90deg, #ff4500, #ff1a1a);
      padding: 1rem 2.5rem;
      border-radius: 12px;
      font-size: 1.4rem;
      font-weight: 800;
      color: white;
      text-decoration: none;
      margin-bottom: 1.5rem;
      box-shadow: 0 0 25px rgba(255, 60, 0, 0.45);
      transition: transform 0.2s ease;
    "
    on:mouseover={(e) => (e.target.style.transform = 'scale(1.07)')}
    on:mouseout={(e) => (e.target.style.transform = 'scale(1)')}
  >
    Start Quiz →
  </a>

  <button
    on:click={logout}
    style="
      padding: 0.8rem 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      background: #333;
      color: white;
      border-radius: 10px;
      border: 1px solid rgba(255, 100, 100, 0.4);
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;
    "
    on:mouseover={(e) => {
      e.target.style.transform = 'scale(1.05)';
      e.target.style.background = '#ff1a1a';
    }}
    on:mouseout={(e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.background = '#333';
    }}
  >
    Logout
  </button>
</div>
