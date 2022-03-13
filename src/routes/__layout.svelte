<script lang="ts">
	import '../styles/_global.less';
	import '../styles/_fonts.less';
	import data from '../data';
	import { generateSectionColorCss } from '../logic';
	import { page } from '$app/stores';

	const { lightModeStyles, darkModeStyles } = generateSectionColorCss(data);

	const title = '5e Quick Reference';
</script>

{@html lightModeStyles}
{@html darkModeStyles}

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:image" content="thumbnail.png" />
</svelte:head>
<div id="root">
	<slot />
</div>
