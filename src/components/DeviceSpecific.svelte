<script lang="ts">
	import { browser } from '$app/env';

	type DeviceType = 'mobile' | 'desktop' | 'all';
	export let device: DeviceType;

	const DEVICE_WIDTH_BREAKPOINT = 768;

	// We first checl `browser` because if `window` is read
	// on the server it will cause an error
	const isMobile = browser && window.innerWidth <= DEVICE_WIDTH_BREAKPOINT;

	const outcomeMap: Record<DeviceType, boolean> = {
		all: true,
		desktop: !isMobile,
		mobile: isMobile
	};
</script>

{#if outcomeMap[device]}
	<slot />
{/if}
