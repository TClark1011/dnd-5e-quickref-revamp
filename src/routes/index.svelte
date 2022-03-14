<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { processedDataStore } from '../a';
	import hash from 'object-hash';

	import { Search } from '../components';
	import RuleSectionCard from '../components/RuleSectionCard.svelte';
	import type { RuleSection } from '../types';
	import { sortData } from '../logic';
	import data from '../data';

	// const processedDataStore = createProcessedDataStore(data);
	// const processedDataStore = derived(searchStore, (search) => filterData(data, search));

	// let sections: readonly RuleSection[] = [];
	// processedDataStore.subscribe((update) => {
	// 	sections = update;
	// });
	const sortedData = sortData(data);
</script>

<div class="content">
	<Search />
	{#each sortedData as section (section.title)}
		<div class="item">
			<RuleSectionCard data={section} />
		</div>
	{/each}
</div>

<style lang="less">
	@import '../styles/index.less';

	.content {
		width: 700px;
		max-width: calc(100vw - (@spacing * 2));
		height: 100%;
		#axisProp(margin, y, @spacing);
		.item {
			#stack(y, @spacing * 2);
		}
	}
</style>
