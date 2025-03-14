<script lang="ts">
	import { type Snippet } from 'svelte';

	const { title, children }: { title: string; children: Snippet } = $props();
</script>

<div id={title}>
	<h2 class="text-2xl font-semibold">{title}</h2>
	<hr />
	<div>
		{@render children()}
	</div>
</div>
