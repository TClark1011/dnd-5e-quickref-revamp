<script lang="ts">
	import { derived } from 'svelte/store';

	import { onInteraction } from '../actions';
	import searchStore from '../store/searchStore';
	import type { RuleItem } from '../types';
	import { compareStrings, searchComparison } from '../utils';
	import Modal from './Modal.svelte';

	export let data: RuleItem;
	let { title, subtitle, bullets, icon, reference, description } = data;

	let modalIsOpen = false;

	const toggleModal = () => {
		modalIsOpen = !modalIsOpen;
	};

	//# Derived values
	const iconSrc = `icons/${icon}.svg`;
	const descriptionSubtitleDiff = compareStrings(subtitle, description, { caseSensitive: false });

	const isVisibleStore = derived(searchStore, (search) => searchComparison(search, title));
</script>

<div class="root" use:onInteraction={toggleModal} tabIndex="0" class:hidden={!$isVisibleStore}>
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
	{#if descriptionSubtitleDiff > 5}
		<p class="description">{description}</p>
	{/if}
	{#each bullets as bullet (bullet)}
		<p class="bullet">{@html bullet}</p>
	{/each}
	<div class="footer">
		<button class="close" use:onInteraction={toggleModal}>Close</button>
		{#if reference}
			<div class="reference">{reference}</div>
		{/if}
	</div>
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

		&.hidden {
			display: none;
		}

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

		&.modal {
			#lightMode({
				background: black !important;
			});
		}
	}

	#tinted() {
		#tintedBackground(0.1);
		#darkMode({
			#tintedBackground(0.2);
		});
	}

	.icon.modal,
	.description {
		#tinted();
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

	.footer {
		border-top: @border;
		padding-top: @padding;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.reference {
			font-style: italic;
		}
	}
</style>
