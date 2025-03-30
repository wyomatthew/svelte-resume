<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import Option from './option.svelte';
	import { yaml as yamlLang } from '@codemirror/lang-yaml';
	import { json as jsonLang } from '@codemirror/lang-json';
	import { type LanguageSupport } from '@codemirror/language';
	import * as yaml from 'yaml';
	import { resumeSchema } from '$lib/resume';
	import { Simple } from '$lib/resume/layouts';

	const supportedLangs = {
		yaml: {
			slug: 'yaml',
			name: 'YAML',
			lang: yamlLang,
			parse: yaml.parse
		},
		json: {
			slug: 'json',
			name: 'JSON',
			lang: jsonLang,
			parse: JSON.parse
		}
	};

	function safeIntParse(code: string) {
		try {
			const data = selectedLang.parse(code);
			return {
				success: true,
				data: data
			};
		} catch (err) {
			if (err == undefined) {
				return {
					success: false,
					error: 'received undefined error'
				};
			}

			return {
				success: false,
				error: err
			};
		}
	}

	let code = $state('');
	let selectedLang = $state(supportedLangs.yaml);
	let intermediateParse = $derived(safeIntParse(code));
	let parseResult = $derived(
		intermediateParse.success ? resumeSchema.safeParse(intermediateParse.data) : intermediateParse
	);
</script>

<div class="min-h-dvh">
	<div class="no-print flex h-full min-h-[50dvh] w-full flex-col p-4">
		<h1>Editor</h1>
		<div class="flex max-h-[50dvh] flex-grow flex-row justify-between gap-4">
			<div class="min-h-10 min-w-10 flex-grow overflow-scroll border">
				<CodeMirror class="h-full w-full" bind:value={code} lang={selectedLang.lang()} />
			</div>
			<div class="flex flex-col justify-between">
				<ul>
					<Option name="Language">
						<ul class="flex flex-col gap-2">
							{#each Object.entries(supportedLangs) as entry}
								<li>
									<label>
										<input
											type="radio"
											name="language"
											value={entry[1]}
											bind:group={selectedLang}
										/>
										{entry[1].name}
									</label>
								</li>
							{/each}
						</ul>
					</Option>
				</ul>
				<div class="flex flex-col items-center">
					<button
						class="border p-2"
						onclick={() => {
							print();
						}}>Print</button
					>
				</div>
			</div>
		</div>
	</div>
	{#if parseResult.success}
		<Simple
			resumeData={{
				resume: parseResult.data,
				keywords: []
			}}
		/>
	{:else}
		<div class="p-4">
			<span class="whitespace-break-spaces"
				>{typeof parseResult.error === 'string'
					? parseResult.error
					: parseResult.error instanceof Error
						? parseResult.error.toString()
						: JSON.stringify(parseResult.error, null, 4)}</span
			>
		</div>
	{/if}
</div>

<style>
	@media print {
		.no-print {
			display: none !important;
		}
	}
</style>
