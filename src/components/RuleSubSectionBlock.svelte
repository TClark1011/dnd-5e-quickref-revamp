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
	.items {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
