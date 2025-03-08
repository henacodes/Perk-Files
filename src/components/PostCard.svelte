<script lang="ts">
	import { trimParag } from '$lib/utils';
	import { ShoppingCart, Plus, FileType, HardDrive } from 'lucide-svelte';
</script>

<div
	class=" border-primary mx-5 my-8 flex border shadow-[6px_6px_#5e503f] transition ease-in-out hover:scale-[1.02]"
>
	<div class="flex-1/2">
		<img src="/art.png" alt="" class=" h-full w-fit object-cover" />
	</div>
	<div class=" flex-1/2 px-4 pt-4">
		<div class="  flex items-center">
			<img src="/avatar.png" class=" mr-1 max-w-7 rounded-full" alt="" />
			<p>Henok Ayenew</p>
		</div>
		<p class=" text-primary text-lg font-bold">
			{trimParag(
				`Lorem ipsum dolor, sit amet consecte adipis elit. Fugit ratione error, minus hic nam
			corrupti inventore laboriosam nobis quia esse sed quasi officia quae quos pariatur, omnis
			veritatis ipsam eligendi.`,
				55
			)}
		</p>

		<div class="mt-11">
			<div>
				<p class=" text-primary my-2 flex items-center">
					<FileType class="text-primary/50 mx-2 " /> PNG
				</p>
				<p class=" text-primary my-2 flex items-center">
					<HardDrive class="text-primary/50 mx-2 " /> 42.6 MB
				</p>
			</div>

			<button class="bg-primary text-secondary my-3 flex w-full items-center justify-center py-1">
				<span class="mx-2"> Cart </span>
				<Plus size={20} />
			</button>
		</div>
	</div>
</div>
