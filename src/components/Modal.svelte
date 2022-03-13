<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen: boolean;
	export let title: string;
	export let subtitle: string | undefined = undefined;
</script>

<Dialog
	open={isOpen}
	on:close={() => {
		isOpen = false;
	}}
	class="modal"
>
	<DialogOverlay class="overlay" />
	<div class="body">
		<div class="head">
			<DialogTitle class="title">{title}</DialogTitle>
			{#if subtitle}
				<DialogDescription class="description">{subtitle}</DialogDescription>
			{/if}
		</div>
		<slot />
	</div>
</Dialog>

<style lang="less">
	@import '../styles/index.less';

	:global(.modal) {
		position: fixed;
		#inset(0);
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;

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
			box-shadow: @boxShadows[high];

			.head {
				margin-bottom: @spacing * 2;

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
	}
</style>
