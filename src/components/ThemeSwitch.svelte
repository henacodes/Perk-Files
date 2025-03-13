<script lang="ts">
	import { getTheme, switchTheme } from '$state/uiState.svelte';
	import { MoonStar, Sun } from 'lucide-svelte';
</script>

<button
	onclick={() => switchTheme()}
	class=" flex justify-center items-center rounded shadow-[2px_2px_#000000] hover:translate-[2px] hover:shadow-none transition ease-in-out cursor-pointer p-2 border-[2px] w-8 h-8"
>
	{#if getTheme() == 'light'}
		<Sun />
	{:else}
		<MoonStar />
	{/if}
</button>
