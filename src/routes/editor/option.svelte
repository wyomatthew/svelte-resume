<script lang="ts">
	const { children, name } = $props();
</script>

<li>
	<div class="flex flex-row items-center justify-between gap-4">
		<div>{name}</div>
		<div>{@render children()}</div>
	</div>
</li>
