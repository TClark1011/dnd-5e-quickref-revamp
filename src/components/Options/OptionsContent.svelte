<script lang="ts">
	import { onInteraction } from '../../actions';
	import { D, F } from '@mobily/ts-belt';
	import { onDestroy } from 'svelte';
	import {
		cardOptionsState,
		getAllCardOptions,
		toggleCardHidden,
		updateAllCardOptions,
		updateSpecificStore,
		type CardOptionsProps
	} from '../../store';
	import { titleCase, subscribeToStoreArray } from '../../utils';

	const setAllCollapsed = (newState: boolean) =>
		updateAllCardOptions(D.update('collapsed', F.always(newState)));

	const toggleSpecificStoreHidden = (title: string) => updateSpecificStore(title, toggleCardHidden);

	// Will hold all of the card options values
	let options: CardOptionsProps[] = [];

	// We subscribe to all the sub-stores held in the
	// cardOptionsState store
	const unsubscribeFromOptionStores = subscribeToStoreArray(
		cardOptionsState,
		() => {
			// Everytime one of the sub-stores is updated
			// we update the local options variable
			options = getAllCardOptions();
		},
		D.get('title')
	);

	onDestroy(() => {
		unsubscribeFromOptionStores();
	});
</script>

<div class="root">
	<div class="expansion-setters">
		<button class="outlined" use:onInteraction={() => setAllCollapsed(false)}>Expand All</button>
		<button class="outlined" use:onInteraction={() => setAllCollapsed(true)}>Collapse All</button>
	</div>
	<ul class="card-list">
		{#each options as { hidden, title }}
			<li use:onInteraction={() => toggleSpecificStoreHidden(title)} class:disabled={hidden}>
				<span>{titleCase(title)}</span>
				<input tabIndex="-1" type="checkbox" checked={!hidden} />
			</li>
		{/each}
	</ul>
</div>

<style lang="less">
	@import '../../styles/index.less';

	.root {
		display: flex;
		flex-direction: column;

		& > * {
			#stack(y, @spacing *2);
			#stack(y, @spacing *2, padding);
			&:not(:last-child) {
				border-bottom: 1px solid @colors[text];
			}
		}

		.expansion-setters {
			width: max-content;
			min-width: 100%;
			display: flex;
			gap: @spacing;
			button {
				flex-grow: 1;
				padding: @spacing*0.5, @spacing;
				font-weight: normal;
				flex-shrink: 0;
			}

			margin-bottom: @spacing * 2;
		}

		.card-list {
			li {
				justify-content: space-between;
				#stack(y, @spacing);
				padding: @spacing;
				#tintedBackground(0.2, 0.1);
				border-radius: @radius[base];
				cursor: pointer;

				&.disabled {
					background: none;
				}

				&:hover {
					#tintedBackground(0.4,0.2);
				}
			}
			margin-bottom: @spacing * 2;
		}
	}
</style>
