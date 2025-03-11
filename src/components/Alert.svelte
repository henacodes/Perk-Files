<script>
	import { Terminal } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let translateValue = $state('-150%');
	onMount(() => {
		setTimeout(() => {
			translateValue = '0%';
		}, 500);
	});
</script>

<div class=" fixed w-full h-[100vh] bg-black/50 top-0 left-0 z-50 px-6">
	<div
		role="alert"
		class=" bg-primary relative top-8 rounded-md shadow-[4px_4px_#000000] z-50 w-full rounded-base shadow-light dark:shadow-dark font-heading border-2 border-border dark:border-darkBorder p-4 bg-main text-text transition ease-in-out duration-200"
		style={`transform: translateX(${translateValue});`}
	>
		<div class="flex items-center">
			<Terminal />
			<h5 class="mb-1 leading-none tracking-tight font-bold">Default Alert</h5>
		</div>
		<div class="text-sm font-base">
			You can add components and dependencies to your app using the cli.
		</div>
	</div>
</div>
