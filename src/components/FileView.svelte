<script lang="ts">
	import { File } from 'lucide-svelte';
	let file = {
		name: 'Some random file hanging around the wall',
		price: 3424,
		format: 'PNG',
		size: 45.3
	};
</script>

<div class="border-dark flex justify-center border-2 p-3 shadow-[4px_4px_#000000] rounded-md my-2">
	<div class=" flex flex-[0.1] flex-col items-center justify-center dark:text-secondary">
		<File />
		<small>{file.size}MB</small>
	</div>
	<p class=" mx-3 flex-[0.7] dark:text-secondary">{file.name}</p>
	<div class=" flex-[0.2] items-center dark:text-secondary">
		<p><span class="font-semibold">ETB</span> {file.price}</p>
		<small>{file.format}</small>
	</div>
</div>
