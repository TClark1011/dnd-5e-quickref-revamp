<script lang="ts">
	import { RuleSectionCard } from '../components';
	import data from '../data';
</script>

{#each data as section}
	<RuleSectionCard data={section} color="red" />
{/each}
