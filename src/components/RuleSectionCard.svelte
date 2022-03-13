<script lang="ts">
	import { slide } from 'svelte/transition';

	import { RuleSubSectionBlock } from '.';
	import { onInteraction } from '../actions';
	import type { RuleSection } from '../types';
	import { titleCase } from '../utils';

	export let data: RuleSection;
	let { title, subSections } = data;

	let collapsed = false;
	const toggleCollapsed = () => {
		collapsed = !collapsed;
	};
</script>

<div class="root" style="--section-color: var(--section-color-{title})">
	<div class="title" use:onInteraction={toggleCollapsed} class:collapsed tabIndex="0">
		<h2>{titleCase(title)}</h2>
		<span class:collapsed class="arrow">{'<'}</span>
	</div>
	{#if !collapsed}
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

		width: 700px;
		border-radius: @rounding;
		background: @colors[ @bg][off];
		overflow: hidden;
		box-shadow: @boxShadows[base];

		.title {
			color: white;
			background-color: @sectionColor;
			padding: @spacing * 2 @contentPadding;
			transition: border-radius 300ms linear;
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			@media print {
				color: black;
			}

			&.collapsed {
				border-bottom-left-radius: @rounding;
				border-bottom-right-radius: @rounding;
				transition-delay: 150ms;
			}

			.arrow {
				transform: rotateZ(-90deg);
				transition: transform 300ms linear;

				@media print {
					display: none;
				}

				&.collapsed {
					transform: rotateZ(0);
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
		}
	}
</style>
