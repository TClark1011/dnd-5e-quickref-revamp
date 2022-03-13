<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { RuleSectionCard } from '../components';
	import data from '../data';
</script>

{#each data as section}
	<div class="item">
		<RuleSectionCard data={section} />
	</div>
{/each}

<style lang="less">
	@import '../styles/index.less';
	.item + .item {
		margin-top: @spacing * 2;
	}
</style>
