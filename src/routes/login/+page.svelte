<script>
  const login = () => {
    window.location.href = "/auth/google";
  };
</script>

<div
  style="
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at top, #1a1a1a 0%, #000 80%);
    color: white;
    text-align: center;
    padding: 2rem;
  "
>
  <h1
    style="
      font-size: 3rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #ff4500, #ff1a1a);
      -webkit-background-clip: text;
      color: transparent;
    "
  >
    Login
  </h1>

  <button
    on:click={login}
    style="
      display: flex;
      align-items: center;
      gap: 10px;
      background: white;
      color: black;
      font-size: 1.2rem;
      padding: 0.9rem 1.8rem;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    "
    on:mouseover={(e) => (e.target.style.transform = 'scale(1.05)')}
    on:mouseout={(e) => (e.target.style.transform = 'scale(1)')}
  >
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google logo"
      style="width: 22px; height: 22px;"
    />
    <span>Login with Google</span>
  </button>
</div>
