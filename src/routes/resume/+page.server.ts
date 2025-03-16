import { discoverResumes, resumeHome } from '$lib/server/resume';
import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import { type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ route }) => {
	if (!fs.existsSync(resumeHome)) {
		error(500, `no such directory '${resumeHome}'`);
	}

	const resumes = (await discoverResumes(resumeHome)).map((path) => {
		return {
			path: path,
			url: `${route.id}/${path}`
		};
	});
	return {
		resumes: resumes
	};
};
