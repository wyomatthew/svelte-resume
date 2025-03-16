import { keywordsPath, loadKeywords } from '$lib/server/resume';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({}) => {
	let keywords: string[] = [];
	try {
		keywords = loadKeywords(keywordsPath);
	} catch (err) {
		console.log('failed to load keywords:');
		console.log(err);
	}
	return {
		keywords: keywords
	};
};
