<script lang="ts">
	import type { RuleSubSection } from '../types';
	import RuleItemBlock from './RuleItemBlock.svelte';

	export let data: RuleSubSection;
	let { description, items } = data;
</script>

<div class="root">
	<p class="description">{description}</p>
	<div class="items">
		{#each items as rule}
			<RuleItemBlock data={rule} />
		{/each}
	</div>
</div>

<style lang="less">
	@import '../styles/index.less';
	.root {
		.description {
			margin-bottom: @spacing;
		}
		.items {
			--columns: 3;
			#simpleGrid(var(--columns), @spacing);

			@media print {
				--columns: 4;
			}

			#phone({
				--columns: 2;
			});
		}
	}
</style>
