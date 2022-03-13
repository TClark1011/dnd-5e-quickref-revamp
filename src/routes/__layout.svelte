<script lang="ts">
	import '../styles/_global.less';
	import '../styles/_fonts.less';
	import { RuleSectionCard } from '../components';
	import data from '../data';
	import { D, pipe, A } from '@mobily/ts-belt';
	import {
		convertObjectToCssStyles,
		kebabCase,
		wrapCssStringWithDarkModePref,
		wrapWithStyleTags
	} from '../utils';
	import { darken } from 'polished';

	const colorVariablesObject = pipe(
		data,
		A.map(D.update('title', kebabCase)),
		A.map(({ color, title }) => ({ [`--section-color-${title}`]: color })),
		A.reduce({}, D.merge)
	);

	const wrapWithRootSelector = (styles: string) => `#root { ${styles} }`;

	const lightModeStyle = pipe(
		colorVariablesObject,
		convertObjectToCssStyles,
		wrapWithRootSelector,
		wrapWithStyleTags
	);
	const darkModeStyle = pipe(
		colorVariablesObject,
		D.map(darken(0.15)),
		convertObjectToCssStyles,
		wrapWithRootSelector,
		wrapCssStringWithDarkModePref,
		wrapWithStyleTags
	);
</script>

<!-- <div id="root" class={css(`${lightModeStyle} ${darkModeStyle}`)}> -->

{@html lightModeStyle}
{@html darkModeStyle}
<div id="root">
	<slot />
</div>
