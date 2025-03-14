import { error } from '@sveltejs/kit';
import * as yaml from 'yaml';
import type { PageServerLoad } from './$types';
import * as fs from 'fs';
import { RESUME_HOME } from '$env/static/private';
import { resumeSchema, type Resume } from '$lib/resume'

export const load: PageServerLoad = ({ params }) => {
	const filePath = RESUME_HOME + '/' + params.path;
	if (!fs.existsSync(filePath)) {
		error(404)
	}

	const contents = fs.readFileSync(filePath).toString()
	let parsed: Resume;
	if (filePath.endsWith(".json")) {
		parsed = resumeSchema.parse(JSON.parse(contents))
	} else if (filePath.endsWith("yml") || filePath.endsWith("yaml")) {
		parsed = resumeSchema.parse(yaml.parse(contents.toString()));
	} else {
		throw new Error(`unsupported file type ${filePath}`)
	}

	return {
		resume: parsed
	}
};
