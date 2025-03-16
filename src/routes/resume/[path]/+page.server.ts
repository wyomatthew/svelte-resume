import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type Resume } from '$lib/resume';
import { ZodError } from 'zod';
import { loadResume } from '$lib/server/resume';

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
