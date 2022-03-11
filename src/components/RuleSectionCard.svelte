<script lang="ts">
	import { RuleSubSectionBlock } from '.';
	import type { RuleSection } from '../types';
	import { titleCase } from '../utils';

	export let data: RuleSection;
	let { title, subSections } = data;
	export let color: string;
</script>

<div class="root" style="--section-color: {color}">
	<div class="title">
		<h2>{titleCase(title)}</h2>
	</div>
	<div class="body">
		{#each subSections as subSection}
			<RuleSubSectionBlock data={subSection} />
		{/each}
	</div>
</div>

<style lang="less">
	@import '../styles/index.less';
	.root {
		@contentPadding: @spacing * 2;

		border: 6px solid var(--section-color);
		width: 700px;
		border-radius: @radius[lg];
		background: @colors[ @bg][off];

		.title {
			color: white;
			background-color: var(--section-color);

			padding: @spacing * 2 @contentPadding;

			h2 {
				font-size: @fontSize[xl];
				font-weight: bold;
			}
		}

		.body {
			padding: @contentPadding;
		}
	}
</style>
