<script>
  import { page } from '$app/stores';
  $: loggedIn = $page.data?.user;
</script>

<nav class="nav">
  <a class="brand" href="/">MotoQuiz</a>

  {#if loggedIn}
    <a href="/logout" class="logout">Logout</a>
  {/if}
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

  .logout {
    background: #ff4d4d;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none; /* makes link look like button */
  }

  .logout:hover {
    background: #ff1a1a;
  }
</style>
