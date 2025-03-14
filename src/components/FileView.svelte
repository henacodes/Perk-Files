<script lang="ts">
	import { File } from 'lucide-svelte';

	const { file, download } = $props();

	console.log(file);
</script>

<div
	class="border-dark border-2 p-3 shadow-[4px_4px_#000000] rounded-md my-2 bg-secondary dark:bg-secondary-dark"
>
	<div class=" flex items-center">
		<div class=" flex flex-[0.1] flex-col items-center justify-center dark:text-secondary">
			<File />
			<small>{23.3}MB</small>
		</div>
		<p class=" mx-3 flex-[0.9] text-xl font-bold text-primary">
			{file.title}
		</p>
	</div>

	<div class="flex flex-col mt-6 text-secondary-dark dark:text-secondary gap-3">
		<p>Author: <span class="font-bold"> {file.author.name}</span></p>
		<p>Price: <span class="font-bold"> ETB {file.price}</span></p>
		<p>
			Posted On: <span class="font-bold"> {new Date(file.createdAt).toLocaleDateString()}</span>
		</p>

		{#if download}
			<button
				class=" bg-primary rounded mt-5 p-3 shadow-[4px_4px_#000] border-[2px] border-black hover:translate-[4px] hover:shadow-none transition ease-in-out"
				>Download</button
			>
		{/if}
	</div>
</div>
