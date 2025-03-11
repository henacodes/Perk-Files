<script lang="ts">
	const { data } = $props();

	console.log(data);
</script>

{#if data.status == 'success'}
	<p>Yayyyyyyyyyyyyyyyyyyyyyyyyy</p>
{:else}
	<p>sorry, dont workkkkkkkkkk</p>
{/if}
