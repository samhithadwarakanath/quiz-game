<script>
  const login = () => {
    window.location.href = "/auth/google";
  };
</script>

<h1>Login</h1>

<button on:click={login}>
  Login with Google
</button>
