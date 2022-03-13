import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess({
	// 	less: preprocess.less()
	// }),
	preprocess: [
		preprocess({
			less: preprocess.less()
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			ssr: {
				noExternal: ['@mobily/ts-belt']
			}
		}
	}
};

export default config;
