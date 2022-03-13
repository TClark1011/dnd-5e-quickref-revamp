<script lang="ts">
	import { slide } from 'svelte/transition';

	import { RuleSubSectionBlock } from '.';
	import { onInteraction } from '../actions';
	import type { RuleSection } from '../types';
	import { kebabCase, titleCase } from '../utils';
	import { B } from '@mobily/ts-belt';
	import { writable } from 'svelte-local-storage-store';

	export let data: RuleSection;
	let { title, subSections } = data;

	let collapsedState = writable(`${title}-collapsed`, false);
	const toggleCollapsed = () => collapsedState.update(B.not);
</script>

<div
	id={title}
	class="root"
	role="button"
	style="--section-color: var(--section-color-{kebabCase(title)})"
>
	<div
		class="title"
		use:onInteraction={toggleCollapsed}
		class:collapsed={$collapsedState}
		tabIndex="0"
	>
		<h2>{titleCase(title)}</h2>
		<img
			src={'icons/chevron-down.svg'}
			alt="arrow"
			class="arrow"
			class:collapsed={$collapsedState}
		/>
	</div>
	{#if !$collapsedState}
		<div class="body" transition:slide={{ duration: 300 }}>
			{#each subSections as subSection}
				<RuleSubSectionBlock data={subSection} />
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	@import '../styles/index.less';
	.root {
		@contentPadding: @spacing * 2;
		@sectionColor: var(--section-color);
		@rounding: @radius[lg];

		width: 100%;
		border-radius: @rounding;
		background-color: @sectionColor;
		overflow: hidden;
		box-shadow: @boxShadows[base];

		.title {
			color: white;
			padding: @spacing * 2 @contentPadding;
			transition: border-radius 300ms linear;
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			#active({
				#tintedBackground(0.2);
			});

			@media print {
				color: black;
			}

			&.collapsed {
				border-bottom-left-radius: @rounding;
				border-bottom-right-radius: @rounding;
				transition-delay: 150ms;
			}

			.arrow {
				transform: rotateZ(0deg);
				transition: transform 300ms linear;

				@media print {
					display: none;
				}

				&.collapsed {
					transform: rotateZ(90deg);
				}
			}

			h2 {
				font-family: @fonts[heading];
				font-size: @fontSize[xl];
				font-weight: bold;
			}
		}

		.body {
			padding: @contentPadding;
			background: @colors[ @bg][off];
		}
	}
</style>
