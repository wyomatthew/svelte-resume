<script lang="ts">
	import { profileItemSchema } from '..';
	import { z } from 'zod';
	const { profile }: { profile: z.infer<typeof profileItemSchema> } = $props();
	const normalizedNetwork = profile.network.toLowerCase();
</script>

<a href={profile.url}>
	<span class="flex flex-row items-center justify-between">
		{#if normalizedNetwork === 'twitter'}
			<img alt="twitter logo" src="/networks/twitter.png" class="h-[1.0rem] object-cover" /> &nbsp;
			Twitter/@{profile.username}
		{:else if normalizedNetwork === 'linkedin'}
			<img alt="linkedin logo" src="/networks/linkedin.webp" class="h-[1.0rem] object-cover" />
			&nbsp; LinkedIn/in/{profile.username}
		{:else if normalizedNetwork === 'github'}
			<img alt="github logo" src="/networks/github.svg" class="h-[1.0rem] object-cover" /> &nbsp;
			GitHub/{profile.username}
		{/if}
	</span>
</a>
