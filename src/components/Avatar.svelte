<script lang="ts">
	const { image, alt, onclick } = $props();

	// Function to get the first letter of the alt name
	const getInitial = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : '';
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="w-8 h-8 rounded flex items-center justify-center overflow-hidden border-[2px] border-black shadow-[2px_2px_#000000] hover:translate-[2px] hover:shadow-none transition ease-in-out cursor-pointer"
	{onclick}
>
	{#if image}
		<img src={image} {alt} class="w-full h-full object-cover" />
	{:else}
		<span class="text-black dark:text-secondary text-xl font-bold">{getInitial(alt)}</span>
	{/if}
</div>
