<script lang="ts">
  export let data;
  const user = data.user;

  const logout = () => {
    window.location.href = "/auth/logout";
  };
</script>

<h1>Welcome, {user.name} 👋</h1>

<img src="{user.picture}" alt="Profile" width="80" style="border-radius: 50%;" />

<p>Email: {user.email}</p>

<button on:click={logout}>Logout</button>

<hr />

<a href="/quiz">Start Quiz →</a>
