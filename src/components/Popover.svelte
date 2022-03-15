<script lang="ts">
	import {
		Popover as BasePopover,
		PopoverButton as BasePopoverButton,
		PopoverPanel as BasePopoverPanel
	} from '@rgossiaux/svelte-headlessui';

	export let buttonWrapperClass = '';
	export let side: 'left' | 'right' = 'left';

	const scopeClasses = (...names: string[]) =>
		names.reduce((result, curr) => `${result} Popover__${curr}`, '');
</script>

<BasePopover class={scopeClasses('root')}>
	<BasePopoverButton class={`${scopeClasses('button')} ${buttonWrapperClass}`}>
		<slot name="button" />
	</BasePopoverButton>
	<BasePopoverPanel class={scopeClasses('panel') + ` ${side}`}>
		<slot />
	</BasePopoverPanel>
</BasePopover>

<style lang="less">
	@import '../styles/index.less';

	#scoped(@class, @rules, @prefix: ~'') {
		:global(@{prefix}.Popover__@{class}) {
			@rules();
		}
	}

	#scoped(root, {
		position: relative;

		#scoped(button, {
			padding: 0;
		});


		#scoped(panel, {
			position: absolute;
			z-index: 10;
			background: @colors[ @bg][off];
			border-radius: @radius[md];
			box-shadow: @boxShadows[elevated];
		});

		#scoped(~'panel.left', {
			right: 0;
		})
	});
</style>
