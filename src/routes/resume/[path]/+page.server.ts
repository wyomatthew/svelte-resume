import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { type Resume } from '$lib/resume';
import { ZodError } from 'zod';
import { loadResume, discoverResumes, resumeHome } from '$lib/server/resume';

export const load: PageServerLoad = ({ params }) => {
	let parsed: Resume;
	try {
		parsed = loadResume(params.path);
	} catch (err) {
		if (err instanceof ZodError) {
			error(400, `${err.name}: ${err.message}`);
		}

		error(500);
	}

	return {
		resume: parsed
	};
};

export const entries: EntryGenerator = async () => {
	const discovered = await discoverResumes(resumeHome);
	return discovered.map((path) => ({
		path: path
	}));
};
