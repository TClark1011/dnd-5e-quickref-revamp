<script lang="ts">
	import { SettingsIcon } from 'svelte-feather-icons';
	import OptionsContent from './OptionsContent.svelte';
	import Popover from '../Popover.svelte';
	import DeviceSpecific from '../DeviceSpecific.svelte';
	import Modal from '../Modal.svelte';

	let modalIsOpen = false;

	const toggleModalOpen = () => {
		modalIsOpen = !modalIsOpen;
	};
</script>

<DeviceSpecific device="desktop">
	<Popover buttonWrapperClass="icon-wrapper" side="left">
		<SettingsIcon class="icon" slot="button" />
		<div class="wrapper">
			<OptionsContent />
		</div>
	</Popover>
</DeviceSpecific>

<DeviceSpecific device="mobile">
	<button on:click={toggleModalOpen} class="icon-wrapper"><SettingsIcon class="icon" /></button>
	<Modal bind:isOpen={modalIsOpen}><OptionsContent /></Modal>
</DeviceSpecific>

<style lang="less">
	@import '../../styles/index.less';

	:global(.icon-wrapper) {
		// padding: @spacing;
		#flexCenter;
	}

	:global(.icon) {
		height: 1.8rem;
		margin: @spacing;
		#flexCenter();
	}

	.wrapper {
		padding: @spacing * 2;
	}
</style>
