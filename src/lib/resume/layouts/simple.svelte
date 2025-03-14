<script lang="ts">
	import { type Snippet } from 'svelte';
	import { educationItemSchema, type Resume } from '..';
	import { Section, Profile } from '../components';
	import DateStr from '../components/date_str.svelte';

	const { resume }: { resume: Resume } = $props();
</script>

{#snippet dateRange({ startDate, endDate }: { startDate: Date; endDate: Date | undefined })}
	<DateStr date={startDate} />
	-
	{#if endDate}
		<DateStr date={endDate} />
	{:else}
		current
	{/if}
{/snippet}

<div class="mx-auto h-full max-w-[8.5in] p-[0.3in] font-serif">
	<div id="header" class="text-center">
		<h1 class="text-4xl font-semibold">{resume.basics.name}</h1>
		<h2>{resume.basics.label}</h2>
		<ul class="flex flex-row justify-center gap-4">
			<li>📞 &nbsp; {resume.basics.phone}</li>
			<li><a href={`mailto:${resume.basics.email}`}>✉️ &nbsp; {resume.basics.email}</a></li>
			{#if resume.basics.location}
				<li>🏠 &nbsp; {resume.basics.location.city}, {resume.basics.location.region}</li>
			{/if}
		</ul>
		{#if resume.basics.profiles}
			<ul class="flex flex-row justify-center gap-4">
				{#each resume.basics.profiles as profile}
					<li><Profile {profile} /></li>
				{/each}
			</ul>
		{/if}
	</div>
	{#if resume.education}
		<Section title="Education">
			{#each resume.education as education}
				<div>
					<div class="flex flex-row items-end justify-between">
						<div>
							<span class="text-lg font-semibold"
								><a href={education.url}>{education.institution}</a></span
							>
							<span class="italic">{education.studyType} of {education.area}</span>
						</div>
						{#if education.startDate}
							<div>
								{@render dateRange({ startDate: education.startDate, endDate: education.endDate })}
							</div>
						{/if}
					</div>
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

		{#if resume.work}
			<Section title="Experience">
				{#each resume.work as work}
					<div class="flex flex-row items-end justify-between">
						<div>
							<span class="text-lg font-semibold"><a href={work.url}>{work.name}</a></span>
							<span class="italic">{work.position}</span>
						</div>
						<div>
							{#if work.startDate}
								<div>
									{@render dateRange({ startDate: work.startDate, endDate: work.endDate })}
								</div>
							{/if}
						</div>
					</div>
					{#if work.highlights}
						<div class="pl-4">
							<ul class="list-disc text-justify">
								{#each work.highlights as highlight}
									<li>{highlight}</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/each}
			</Section>
		{/if}
	{/if}

	{#if resume.projects}
		<Section title="Projects">
			{#each resume.projects as project}
				<div class="flex flex-row items-end justify-between">
					<div>
						<span class="text-lg font-semibold"><a href={project.url}>{project.name}</a></span>
						<span class="italic">{project.description}</span>
					</div>
					<div>
						{#if project.startDate}
							<div>
								{@render dateRange({ startDate: project.startDate, endDate: project.endDate })}
							</div>
						{/if}
					</div>
				</div>
				{#if project.highlights}
					<div class="pl-4">
						<ul class="list-disc text-justify">
							{#each project.highlights as highlight}
								<li>{highlight}</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/each}
		</Section>
	{/if}

	{#snippet entry({ name, items }: { name: string; items: string[] })}
		<li><span class="italic">{name}</span>: {items.join(', ')}</li>
	{/snippet}

	{#if resume.awards}
		<Section title="Awards & Certifications">
			{#each resume.awards as award}
				<div class="flex flex-row items-end justify-between">
					<div>
						<span class="text-lg font-semibold">{award.title}</span>
						<span class="italic">{award.awarder}</span>
					</div>
					{#if award.date}
						<div>
							<DateStr date={award.date} />
						</div>
					{/if}
				</div>
				<div class="pl-4">
					{award.summary}
				</div>
			{/each}
		</Section>
	{/if}
	{#if resume.skills || resume.languages || resume.interests}
		<Section title="Skills & Interests">
			<ul>
				{#if resume.languages}
					{@render entry({
						name: 'Languages',
						items: resume.languages.map((item) => `${item.language} (${item.fluency})`)
					})}
				{/if}
				{#if resume.skills}
					{#each resume.skills as skill}
						{@render entry({
							name: skill.name,
							items: skill.keywords ? skill.keywords : []
						})}
					{/each}
				{/if}

				{#if resume.interests}
					{@render entry({
						name: 'Interests',
						items: resume.interests.map((item) => item.name)
					})}
				{/if}
			</ul>
		</Section>
	{/if}
</div>
