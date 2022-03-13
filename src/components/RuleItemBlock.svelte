<script lang="ts">
	import { onInteraction } from '../actions';

	import type { RuleItem } from '../types';
	import Modal from './Modal.svelte';

	export let data: RuleItem;
	let { title, subtitle, bullets, icon, reference, description } = data;

	let modalIsOpen = false;
	const toggleModal = () => {
		modalIsOpen = !modalIsOpen;
	};
</script>

<div class="root" use:onInteraction={toggleModal} tabIndex="0">
	<!-- <div class="darken" /> -->
	<img src={`icons/${icon}.svg`} alt={icon} class="icon" />
	<div class="text">
		<h3>{title}</h3>
		<p class="subtitle">
			{subtitle}
		</p>
	</div>
</div>

<Modal bind:isOpen={modalIsOpen} {title} {subtitle}>
	<p class="description">{description}</p>
	{#each bullets as bullet}
		<p class="bullet">{@html bullet}</p>
	{/each}
	{#if reference}
		<div class="reference">{reference}</div>
	{/if}
</Modal>

<style lang="less">
	@import '../styles/index.less';

	.root {
		@gutter: @spacing;
		@contentLineHeight: 1.2rem;
		@rounding: @radius[md];

		display: flex;
		gap: 4px;
		cursor: pointer;
		border-radius: @rounding;
		padding: @gutter;
		position: relative;

		@media screen {
			#offsetColumnGutter(3, @gutter);
		}
		@media print {
			#offsetColumnGutter(4, @gutter);
		}

		#active({
			--opacity: 0.1;
			background: rgba(0,0,0,var(--opacity));

			#darkMode({
				--opacity: 0.2;
			});
		});

		.icon {
			border-radius: @radius[md];
			background: black;
			#size(@contentLineHeight * 2);
			padding: @spacing * 0.5;

			@media print {
				display: none;
			}
		}

		.text {
			h3 {
				font-weight: bold;
			}
			* {
				line-height: @contentLineHeight;
			}
		}
	}

	//# Modal Contents
	@border: 1px solid @colors[text];
	@padding: @spacing * 2;

	.description {
		margin-bottom: @padding;
		// font-style: italic;
		padding: @spacing;
		#tintedBackground(0.2);
		border-radius: @radius[md];
	}

	.bullet {
		#axisProp(padding, y, @padding);
		border-top: @border;
		line-height: 1.4rem;

		&:last-child {
			padding-bottom: 0;
		}
	}

	.reference {
		border-top: @border;
		display: flex;
		justify-content: flex-end;
		padding-top: @padding;
		font-style: italic;
	}
</style>
