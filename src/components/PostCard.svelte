<script lang="ts">
	import { trimParag } from '$lib/utils';
	import { Plus, FileType, HardDrive } from 'lucide-svelte';

	let { file } = $props();
</script>

<div
	class="  border-black bg-primary mx-5 my-8 flex border-2 shadow-[4px_4px_#000000] transition ease-in-out rounded-md flex-col"
>
	<div class="flex-1/2 w-full rounded-t-md">
		<img src="/art.png" alt="" class=" rounded-t-md h-full object-cover w-full" />
	</div>
	<div class="  px-4 pt-4 flex-1/2">
		<div class="  flex items-center">
			<img src="/avatar.png" class=" mr-1 max-w-7 rounded-full border-2 border-black" alt="" />
			<p class=" w-full">{file.author.name}</p>
		</div>
		<p class=" text-black text-lg font-bold">
			{trimParag(file.title, 55)}
		</p>

		<div class="mt-11">
			<div>
				<p class=" text-slate-600 my-2 flex items-center">
					<FileType class="text-slate-600  mx-2 " /> PNG
				</p>
				<p class=" text-slate-600 my-2 flex items-center">
					<HardDrive class="text-slate-600 mx-2 " /> 42.6 MB
				</p>
			</div>

			<button
				class="bg-secondary text-black border-[2px] border-dark my-3 flex w-full items-center justify-center py-1 shadow-[3px_3px_#000000] hover:translate-[3px] hover:shadow-none transition ease-in-out rounded-md"
			>
				<span class="mx-2"> Cart </span>
				<Plus size={20} />
			</button>
		</div>
	</div>
</div>
