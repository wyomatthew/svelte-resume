<script lang="ts">
	import { type ResumeData } from '$lib/resume';
	import { Section, Profile } from '../components';
	import DateStr from '../components/date_str.svelte';

	const { resumeData }: { resumeData: ResumeData } = $props();
	const keywordSplitPoint = Math.ceil(resumeData.keywords.length / 2);
	const leftKeywords = resumeData.keywords.slice(0, keywordSplitPoint);
	const rightKeywords = resumeData.keywords.slice(keywordSplitPoint);
</script>

{#snippet item({
	header,
	subheader,
	location,
	startDate,
	endDate,
	url,
	highlights
}: {
	header: string;
	subheader: string | undefined;
	location: string | undefined;
	startDate: Date | undefined;
	endDate: Date | undefined;
	url: string | undefined;
	highlights: string[] | undefined;
})}
	<div class="flex flex-row items-end justify-between">
		<div>
			{#if url}
				<a href={url}>
					<span class="text-lg font-semibold">{header}</span>
				</a>
			{:else}
				<span class="text-lg font-semibold">{header}</span>
			{/if}
			&nbsp; <span class="italic">{subheader}</span>
		</div>
		<div>
			{#if location}
				<span class="font-semibold">{location}</span>
			{/if}
			{#if location && startDate}
				&nbsp;
			{/if}
			{#if startDate}
				{@render dateRange({ startDate, endDate })}
			{/if}
		</div>
	</div>
	{#if highlights}
		<ul class="list-disc pl-4 text-justify">
			{#each highlights as highlight}
				<li>{highlight}</li>
			{/each}
		</ul>
	{/if}
{/snippet}

{#snippet dateRange({ startDate, endDate }: { startDate: Date; endDate: Date | undefined })}
	<span class="italic">
		<DateStr date={startDate} />
		-
		{#if endDate}
			<DateStr date={endDate} />
		{:else}
			current
		{/if}
	</span>
{/snippet}

{#snippet location({ location }: { location: string })}
	<span class="bold">
		{location}
	</span>
{/snippet}

<div class="relative mx-auto h-full max-w-[8.5in] font-serif">
	<div
		class="absolute z-[-1] h-full w-full text-[0.1rem] leading-0.5 text-white [writing-mode:vertical-lr]"
	>
		<div class="relative w-full">
			<div class="absolute top-0 left-0 text-justify select-none">
				{leftKeywords.join(' ')}
			</div>
			<div class="absolute top-0 right-0 text-justify select-none">
				{rightKeywords.join(' ')}
			</div>
		</div>
	</div>
	<div class="p-[0.3in]">
		<div id="header" class="text-center">
			<h1 class="text-4xl font-semibold">{resumeData.resume.basics.name}</h1>
			<h2>{resumeData.resume.basics.label}</h2>
			<ul class="flex flex-row justify-center gap-4">
				<li>📞 &nbsp; {resumeData.resume.basics.phone}</li>
				<li>
					<a href={`mailto:${resumeData.resume.basics.email}`}
						>✉️ &nbsp; {resumeData.resume.basics.email}</a
					>
				</li>
				{#if resumeData.resume.basics.location}
					<li>
						🏠 &nbsp; {resumeData.resume.basics.location.city}, {resumeData.resume.basics.location
							.region}
					</li>
				{/if}
			</ul>
			{#if resumeData.resume.basics.profiles}
				<ul class="flex flex-row justify-center gap-4">
					{#each resumeData.resume.basics.profiles as profile}
						<li><Profile {profile} /></li>
					{/each}
				</ul>
			{/if}
		</div>
		{#if resumeData.resume.education}
			<Section title="Education">
				{#each resumeData.resume.education as education}
					<div>
						{@render item({
							header: education.institution,
							subheader: `${education.studyType} of ${education.area}`,
							startDate: education.startDate,
							endDate: education.endDate,
							url: education.url,
							location: undefined,
							highlights: []
						})}
						<div class="pl-4">
							<ul class="flex flex-col items-start justify-start">
								<li>Final result: {education.score}</li>
								{#if education.courses}
									<li>Relevant coursework: {education.courses.join(', ')}</li>
								{/if}
							</ul>
						</div>
					</div>
				{/each}
			</Section>
		{/if}

		{#if resumeData.resume.work}
			<Section title="Experience">
				{#each resumeData.resume.work as work}
					{@render item({
						header: work.name,
						subheader: work.position,
						location: work.location,
						startDate: work.startDate,
						endDate: work.endDate,
						url: work.url,
						highlights: work.highlights
					})}
				{/each}
			</Section>
		{/if}

		{#if resumeData.resume.projects}
			<Section title="Projects">
				{#each resumeData.resume.projects as project}
					{@render item({
						header: project.name,
						subheader: project.description,
						startDate: project.startDate,
						endDate: project.endDate,
						url: project.url,
						location: undefined,
						highlights: project.highlights
					})}
				{/each}
			</Section>
		{/if}

		{#snippet entry({ name, items }: { name: string; items: string[] })}
			<li><span class="italic">{name}</span>: {items.join(', ')}</li>
		{/snippet}

		{#if resumeData.resume.awards}
			<Section title="Awards & Certifications">
				{#each resumeData.resume.awards as award}
					{@render item({
						header: award.title,
						subheader: award.awarder,
						startDate: award.date,
						endDate: undefined,
						location: undefined,
						url: undefined,
						highlights: undefined
					})}
					<div class="pl-4">
						{award.summary}
					</div>
				{/each}
			</Section>
		{/if}
		{#if resumeData.resume.skills || resumeData.resume.languages || resumeData.resume.interests}
			<Section title="Skills & Interests">
				<ul>
					{#if resumeData.resume.languages}
						{@render entry({
							name: 'Languages',
							items: resumeData.resume.languages.map((item) => `${item.language} (${item.fluency})`)
						})}
					{/if}
					{#if resumeData.resume.skills}
						{#each resumeData.resume.skills as skill}
							{@render entry({
								name: skill.name,
								items: skill.keywords ? skill.keywords : []
							})}
						{/each}
					{/if}

					{#if resumeData.resume.interests}
						{@render entry({
							name: 'Interests',
							items: resumeData.resume.interests.map((item) => item.name)
						})}
					{/if}
				</ul>
			</Section>
		{/if}
	</div>
</div>
