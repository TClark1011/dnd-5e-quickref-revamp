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
	.root {
		border: 3px solid var(--section-color);
		width: 700px;
		border-radius: 8px;
		background: var(--bg-off);

		@contentPadding: 16px;

		.title {
			color: white;
			background-color: var(--section-color);
			padding: 8px @contentPadding;

			h2 {
				font-size: 1.4rem;
				font-weight: bold;
			}
		}

		.body {
			padding: @contentPadding;
		}
	}
</style>
