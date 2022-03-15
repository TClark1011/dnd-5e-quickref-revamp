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
	<footer class="offset">
		<p>
			<span>Thanks to </span><a href="https://github.com/crobi">crobi</a> for the
			<a href="https://crobi.github.io/dnd5e-quickref/preview/quickref.html">original</a> | icons
			from <a href="https://game-icons.net/">game-icons</a>
		</p>
	</footer>
</div>

<style lang="less">
	@import '../styles/index.less';

	#root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100vh;

		.offset {
			height: 4rem;
		}

		footer {
			text-align: center;
			#flexCenter();
		}
	}
</style>
