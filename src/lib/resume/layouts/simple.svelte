<script lang="ts">
	import { type ResumeData } from '$lib/resume';
	import { Section, Profile } from '../components';
	import DateStr from '../components/date_str.svelte';

	const { resumeData }: { resumeData: ResumeData } = $props();
	const keywordSplitPoint = Math.ceil(resumeData.keywords.length / 2);
	const leftKeywords = resumeData.keywords.slice(0, keywordSplitPoint);
	const rightKeywords = resumeData.keywords.slice(keywordSplitPoint);
</script>

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
						<div class="flex flex-row items-end justify-between">
							<div>
								<span class="text-lg font-semibold"
									><a href={education.url}>{education.institution}</a></span
								>
								<span class="italic">{education.studyType} of {education.area}</span>
							</div>
							{#if education.startDate}
								<div>
									{@render dateRange({
										startDate: education.startDate,
										endDate: education.endDate
									})}
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
		{/if}

		{#if resumeData.resume.work}
			<Section title="Experience">
				{#each resumeData.resume.work as work}
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

		{#if resumeData.resume.projects}
			<Section title="Projects">
				{#each resumeData.resume.projects as project}
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

		{#if resumeData.resume.awards}
			<Section title="Awards & Certifications">
				{#each resumeData.resume.awards as award}
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
