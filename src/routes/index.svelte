<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { RuleSectionCard, Search, Options } from '../components';
	import data from '../data';
	import { sortData } from '../logic';

	$: sortedData = sortData(data);
</script>

<div class="content">
	<div class="header">
		<Search />
		<Options />
	</div>
	{#each sortedData as section}
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

		.header {
			display: flex;
			align-items: center;
			margin-bottom: @spacing * 2;
			gap: @spacing;
		}
		.item {
			#stack(y, @spacing * 2);
		}
	}
</style>
