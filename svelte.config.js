import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';

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
			},
			plugins: [svg({})]
		}
	}
};

export default config;
