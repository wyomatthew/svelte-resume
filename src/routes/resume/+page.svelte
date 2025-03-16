<script lang="ts">
	const { data } = $props();
</script>

<ul>
	{#each data.resumes as resume}
		<a href={resume.url}><li>{resume.path}</li></a>
	{/each}
</ul>
