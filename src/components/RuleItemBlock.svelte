<script lang="ts">
	import { fade } from 'svelte/transition';

	import { onInteraction } from '../actions';
	import { deriveIfRuleIsVisible } from '../store';
	import type { RuleItem } from '../types';
	import { compareStrings } from '../utils';
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

	const isVisibleState = deriveIfRuleIsVisible(data);
</script>

{#if $isVisibleState}
	<div
		class="root"
		use:onInteraction={toggleModal}
		tabIndex="0"
		transition:fade={{ duration: 100 }}
	>
		<img src={iconSrc} alt={icon} class="icon" />
		<div class="text">
			<h3>{title}</h3>
			<p class="subtitle">
				{subtitle}
			</p>
		</div>
	</div>
{/if}

<Modal bind:isOpen={modalIsOpen} {title} {subtitle}>
	<img src={iconSrc} alt={icon} class="icon modal" slot="icon" />
	{#if descriptionSubtitleDiff > 5}
		<p class="description">{description}</p>
	{/if}
	<div>
		{#each bullets as bullet}
			<p class="bullet">{@html bullet}</p>
		{/each}
	</div>
	<div class="reference" slot="extra-footer">{reference}</div>
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
		padding: @spacing;
		border-radius: @radius[md];
	}

	.bullet {
		#axisProp(padding, y, @padding);
		border-top: @border;
		line-height: 1.4rem;

		&:last-child {
			border-bottom: @border;
			margin-bottom: @padding;
		}
	}

	.reference {
		font-style: italic;
	}
</style>
