<script lang="ts">
	import '../styles/_global.less';
	import '../styles/_fonts.less';
	import data from '../data';
	import { generateSectionColorCss } from '../logic';

	const { lightModeStyles, darkModeStyles } = generateSectionColorCss(data);
</script>

{@html lightModeStyles}
{@html darkModeStyles}
<div id="root">
	<slot />
</div>
