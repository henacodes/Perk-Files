<script>
	import FileView from '../components/FileView.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import PostCard from '../components/PostCard.svelte';
</script>

<img src="/bubble.png" class=" relative z-0 mb-[-80%] w-full" alt="" />
<div class=" relative z-30 pt-4">
	<p class=" text-primary px-6 text-3xl font-bold">PerkFiles.</p>
	<p class=" m-15 text-center text-5xl font-bold">Earn what you deserve</p>

	<div class=" flex justify-center p-4">
		<button
			class=" browse border-primary flex cursor-pointer items-center border p-2 px-7 transition ease-linear hover:shadow-[4px_4px_#5e503f]"
		>
			<span class=" mx-2">Browse</span>
			<ArrowRight size={20} />
		</button>
	</div>

	<div class=" bg-primary/10 p-6">
		<p class=" text-2xl font-semibold">Popular Gems</p>

		<PostCard />
		<PostCard />
		<PostCard />
		<PostCard />
	</div>
</div>

<style>
</style>
