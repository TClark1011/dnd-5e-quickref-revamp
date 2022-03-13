<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { RuleSectionCard } from '../components';
	import data from '../data';
	import { sortData } from '../logic';

	$: sortedData = sortData(data);
</script>

{#each sortedData as section}
	<div class="item">
		<RuleSectionCard data={section} />
	</div>
{/each}

<style lang="less">
	@import '../styles/index.less';
	.item {
		#stack(y, @spacing * 2);
	}
</style>
