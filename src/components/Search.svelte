<script lang="ts">
	import { F } from '@mobily/ts-belt';
	import { onInteraction } from '../actions';
	import data from '../data';
	import { deriveNumberOfVisibleItems, searchState } from '../store';
	import XIcon from '/static/icons/x.svg?component';

	const updateGlobalSearchState = F.debounce(searchState.set, 200);
	const numberOfResultsState = deriveNumberOfVisibleItems(data);

	let value = '';

	let searchInputEl: HTMLInputElement;

	const clearSearch = () => {
		value = '';
	};

	$: {
		updateGlobalSearchState(value);
	}
</script>

<div class="root">
	<div class="search">
		<input bind:value placeholder="Search" bind:this={searchInputEl} name="search" role="search" />
		<button class="clear" aria-label="clear" use:onInteraction={clearSearch}><XIcon /></button>
	</div>
	{#if $searchState}
		{#if $numberOfResultsState > 0}
			<p class="summary">{$numberOfResultsState} results</p>
		{:else}
			<p>No results</p>
		{/if}
	{/if}
</div>

<style lang="less">
	@import '../styles/index.less';
	.root {
		@color: @colors[text];
		@border: 1px solid @color;

		width: 100%;
		margin-bottom: @spacing * 2;

		.search {
			position: relative;
			display: flex;
			align-items: center;

			input {
				width: 100%;
				padding: @spacing * 2;

				border: @border;
				border-radius: @radius[lg];
				color: @color;

				&::placeholder {
					color: @color;
					opacity: 0.6;
				}
			}

			.clear {
				position: absolute;
				right: @spacing * 2;
				padding: 0;
				display: flex;
				align-items: center;
			}
		}

		p {
			text-align: center;
			#axisProp(padding, y, @spacing);

			&.summary {
				border-bottom: @border;
			}
		}
	}
</style>
