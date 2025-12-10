<script>
  export let data;

  // user from layout.server.ts
  $: loggedIn = !!data.user;
</script>

<nav class="nav">
  <a class="brand" href="/">MotoQuiz</a>

  
</nav>

<slot />


<style>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #0d1117;
    color: white;
  }

  .brand {
    font-size: 1.4rem;
    font-weight: bold;
    color: #58a6ff;
    text-decoration: none;
  }

  
</style>
