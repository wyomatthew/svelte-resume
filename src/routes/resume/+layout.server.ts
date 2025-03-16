import { keywordsPath, loadKeywords } from '$lib/server/resume';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({}) => {
	const keywords = loadKeywords(keywordsPath);
	return {
		keywords: keywords
	};
};
