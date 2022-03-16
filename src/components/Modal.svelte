<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen: boolean;
	export let title: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;
	export let hideCloseButton = false;

	let bodyRef: HTMLElement;
</script>

<Dialog
	open={isOpen}
	on:close={() => {
		isOpen = false;
	}}
	class="Modal__modal"
	initialFocus={bodyRef}
>
	<DialogOverlay class="overlay" />
	<div class="body" bind:this={bodyRef}>
		{#if $$slots.icon || title || subtitle}
			<div class="head">
				{#if title || subtitle}
					<div class="text">
						{#if title}
							<DialogTitle class="title">{title}</DialogTitle>
						{/if}
						{#if subtitle}
							<DialogDescription class="description">{subtitle}</DialogDescription>
						{/if}
					</div>
				{/if}
				<slot name="icon" />
			</div>
		{/if}
		<slot />
		<div class="footer">
			{#if !hideCloseButton}
				<button
					on:click={() => {
						isOpen = false;
					}}>Close</button
				>
			{/if}
			<slot name="extra-footer" />
		</div>
	</div>
</Dialog>

<style lang="less">
	@import '../styles/index.less';

	:global(.Modal__modal) {
		position: fixed;
		#inset(0);
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		max-height: var(--client-height);

		:global(.overlay) {
			position: fixed;
			#inset(0);
			background: black;
			opacity: 0.3;
		}

		.body {
			max-width: calc(100vw - @spacing * 4);
			width: 400px;
			position: relative;
			border-radius: @radius[xl];
			#axisProp(margin, x, auto);
			padding: @spacing * 2;
			background: @colors[ @bg][off];
			box-shadow: @boxShadows[max];
			overflow: auto;
			max-height: var(--client-height);

			.head {
				margin-bottom: @spacing * 2;
				display: flex;
				justify-content: space-between;

				:global(.title) {
					font-weight: 600;
					font-size: @fontSize[xl];
					margin-bottom: @spacing;
				}

				:global(.description) {
					font-style: italic;
				}
			}
		}
		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
