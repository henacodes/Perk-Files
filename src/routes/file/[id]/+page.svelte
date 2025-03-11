<script>
	import { ShoppingCart, FileType, Banknote, MonitorDown } from 'lucide-svelte';
</script>

<div class=" pb-6">
	<img src="/art.png" alt="" class="art w-full mb-[-20%]" />
	<div class="px-7">
		<p class=" text-primary text-5xl font-bold">The country yard of the old residency in munich</p>
		<div class="  my-3 flex items-center">
			<img src="/avatar.png" class=" mr-1 max-w-7 rounded-full" alt="" />
			<p class="text-primary">Henok Ayenew</p>
		</div>

		<p class=" text-primary/50 my-2 text-sm">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam dicta dolor error est, minima
			consequatur! Labore cupiditate molestiae, vel maiores iusto quo minus at enim? Inventore
			quisquam similique amet dicta.
		</p>

		<div class=" my-9 border border-primary">
			<p
				class=" text-primary border-b border-primary flex items-center hover:bg-primary/10 transition ease-in-out font-bold p-2"
			>
				<FileType class="text-primary/50 mx-2 " /> PNG
			</p>
			<p
				class=" text-primary border-b border-primary flex items-center hover:bg-primary/10 transition ease-in-out font-bold p-2"
			>
				<Banknote class="text-primary/50 mx-2 " /> ETB 3400
			</p>
			<p
				class=" text-primary flex items-center hover:bg-primary/10 transition ease-in-out font-bold p-2"
			>
				<MonitorDown class="text-primary/50 mx-2 " /> 5433 downloads
			</p>
		</div>

		<button
			class=" border-primary text-primary flex w-full justify-center border-2 p-3 font-semibold transition ease-in-out hover:shadow-[4px_4px_#5e503f] rounded-md"
		>
			<ShoppingCart class=" mx-2 " /> Add to cart
		</button>
	</div>
</div>

<style>
	.art {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	}
</style>
