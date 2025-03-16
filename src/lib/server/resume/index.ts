import * as fs from 'fs';
import { RESUME_HOME, KEYWORDS_PATH } from '$env/static/private';
import { glob } from 'fs/promises';
import * as yaml from 'yaml';
import { type Resume, resumeSchema } from '../../resume/';

export class FileExtError extends Error {
	constructor(msg: string) {
		super(msg);

		Object.setPrototypeOf(this, FileExtError.prototype);
	}
}

export const resumeHome = RESUME_HOME;
export const keywordsPath = KEYWORDS_PATH ? KEYWORDS_PATH : "keywords.txt"

export type Parser = (content: string) => Resume;

const parseJson = (contents: string) => {
	return resumeSchema.parse(JSON.parse(contents));
};

const parseYaml = (contents: string) => {
	return resumeSchema.parse(yaml.parse(contents));
};

export const SUPPORTED_FILE_TYPES: Map<string, Parser> = new Map(
	Object.entries({
		'.yaml': parseYaml,
		'.yml': parseYaml,
		'.json': parseJson
	})
);

export const discoverResumes = async (basePath: string) => {
	if (!fs.existsSync(basePath)) {
		throw new Error(`no such directory ${basePath}`);
	}

	const patterns = Array.from(
		SUPPORTED_FILE_TYPES.keys().map((extension) => `${basePath}/**/*${extension}`)
	);
	return (await Array.fromAsync(glob(patterns))).map((path) => path.slice(basePath.length + 1));
};

export const loadResume = (path: string): Resume => {
	const splitPath = path.split('.');
	const fileExtension = '.' + splitPath[splitPath.length - 1];

	const parser = SUPPORTED_FILE_TYPES.get(fileExtension);
	if (!parser) {
		throw new Error(`unsupported file extension '${fileExtension}'`);
	}

	const fullPath = `${resumeHome}/${path}`;
	const contents = fs.readFileSync(fullPath).toString();

	return parser(contents);
};

export const loadKeywords = (path: string): string[] => {
	const fullPath = `${resumeHome}/${path}`;
	const contents = fs.readFileSync(fullPath).toString();

	return contents.split('\n').filter((item) => item.length > 0);
};
