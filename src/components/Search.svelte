<script lang="ts">
	import { F } from '@mobily/ts-belt';
	import searchStore from '../store/searchStore';

	let value = '';

	// const updateGlobalSearchState = F.debounce((newState: string) => {
	// 	searchStore.set(newState);
	// }, 150);
	const updateGlobalSearchState = (newState: string) => {
		searchStore.set(newState);
	};

	$: {
		updateGlobalSearchState(value);
	}
</script>

<input bind:value placeholder="Search..." />

<style lang="less">
	@import '../styles/index.less';
	input {
		padding: @spacing*2;
		color: @colors[text];
		border: 1px solid @colors[text];
		width: 100%;
		border-radius: @radius[lg];
		margin-bottom: @spacing * 2;
	}
</style>
