<script lang="ts">
	import { enhance } from '$app/forms';

	// Allow ANY shape from load() and from actions
	export let data: Record<string, any>;
</script>

<h1>Quiz</h1>

<!-- If form result exists, show results -->
{#if data.form}
	<div class="results">
		<h2>{data.form.message}</h2>
		<p>Your Score: <strong>{data.form.score}</strong> / {data.form.total}</p>

		<a href="/quiz">Try Again →</a>
		<br />
		<a href="/">Home →</a>
	</div>
{:else}
	<!-- If no questions -->
	{#if !data.questions || data.questions.length === 0}
		<p>No questions available.</p>
	{:else}
		<form method="POST" action="?/submit">

			{#each data.questions as q, index}
				<fieldset class="question-block">
					<legend>{index + 1}. {q.question}</legend>

					<label>
						<input type="radio" name={`q-${q.id}`} value="A" required />
						{q.optionA}
					</label>

					<label>
						<input type="radio" name={`q-${q.id}`} value="B" />
						{q.optionB}
					</label>

					<label>
						<input type="radio" name={`q-${q.id}`} value="C" />
						{q.optionC}
					</label>

					<label>
						<input type="radio" name={`q-${q.id}`} value="D" />
						{q.optionD}
					</label>
				</fieldset>
			{/each}

			<button type="submit">Submit Quiz</button>
		</form>
	{/if}
{/if}

<style>
	.question-block {
		margin-bottom: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
