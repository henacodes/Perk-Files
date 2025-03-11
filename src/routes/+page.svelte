<script>
	import FileView from '../components/FileView.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import PostCard from '../components/PostCard.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Alert from '../components/Alert.svelte';

	const { data } = $props();

	onMount(() => {
		if (browser) {
			if (data.files) {
				localStorage.setItem('file-cart', JSON.stringify(data.files));
			}
		}
	});
</script>

<div class=" relative z-30 bg-primary/10">
	<div class="  w-full p-3 flex justify-start border-b-2 border-black">
		<p
			class=" text-primary px-3 text-3xl font-bold border border-primary p-2 shadow-[2px_2px_#000000] rounded bg-secondary"
		>
			P.
		</p>
	</div>
	<div class="bg-primary p-10 border-b-2 border-black">
		<p class="  text-center text-5xl font-bold text-black">Earn what you deserve</p>

		<div class=" flex justify-center pb-10 pt-5">
			<button
				class=" browse border-black text-black flex cursor-pointer items-center border-2 rounded-md p-2 px-7 transition ease-linear hover:shadow-[3px_3px_#000000] hover:scale-105"
			>
				<span class=" mx-2">Browse</span>
				<ArrowRight size={20} />
			</button>
		</div>
	</div>

	<div class=" bg-primary/10 p-6 border-t-2 border-primary">
		<p class=" text-2xl font-semibold">Popular Gems</p>

		{#each data.files as file}
			<PostCard {file} />
		{/each}
	</div>
</div>
