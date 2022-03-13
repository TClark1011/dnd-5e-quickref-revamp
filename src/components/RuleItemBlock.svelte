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

	const iconSrc = `icons/${icon}.svg`;
</script>

<div class="root" use:onInteraction={toggleModal} tabIndex="0">
	<!-- <div class="darken" /> -->
	<img src={iconSrc} alt={icon} class="icon" />
	<div class="text">
		<h3>{title}</h3>
		<p class="subtitle">
			{subtitle}
		</p>
	</div>
</div>

<Modal bind:isOpen={modalIsOpen} {title} {subtitle}>
	<img src={iconSrc} alt={icon} class="icon modal" slot="icon" />
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
	@contentLineHeight: 1.2rem;

	.root {
		@gutter: @spacing;
		@rounding: @radius[md];

		display: flex;
		gap: 4px;
		cursor: pointer;
		border-radius: @rounding;
		padding: @gutter;
		position: relative;

		@media screen {
			#desktop({
				#offsetColumnGutter(3, @gutter);
			});
			#phone({
				#offsetColumnGutter(2, @gutter);
			});
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

		.text {
			h3 {
				font-weight: bold;
			}
			* {
				line-height: @contentLineHeight;
			}
		}
	}

	.icon {
		border-radius: @radius[md];
		background: black;
		#size(@contentLineHeight * 2);
		padding: @spacing * 0.5;

		@media print {
			display: none;
		}
	}

	.icon.modal,
	.description {
		#tintedBackground(0.1);
		#darkMode({
			#tintedBackground(0.2);
		});
	}

	//# Modal Contents
	@border: 1px solid @colors[text];
	@padding: @spacing * 2;

	.description {
		margin-bottom: @padding;
		// font-style: italic;
		padding: @spacing;
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
