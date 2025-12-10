<script>
    export let url;

    const score = url.searchParams.get("score");
    const total = url.searchParams.get("total");
</script>

<h1>Your Results</h1>

<p>You scored <strong>{score}</strong> out of <strong>{total}</strong>.</p>

<br>

<a href="/quiz">
    <button>Try Again</button>
</a>

<a href="/practice">
    <button>Practice with AI</button>
</a>
