<script lang="ts">
	import { browser } from '$app/env';

	let height: number;

	$: {
		if (browser) {
			document.documentElement.style.setProperty('--client-height', `${height}px`);
		}
	}
</script>

<svelte:window bind:innerHeight={height} />
