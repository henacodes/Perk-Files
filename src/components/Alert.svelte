<script>
	import { Terminal } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { getAlert } from '$state/uiState.svelte';

	let translateValue = $state('-150%');
	onMount(() => {
		setTimeout(() => {
			translateValue = '0%';
		}, 300);
	});

	let title = getAlert()?.title;
	let message = getAlert()?.message;
	let type = getAlert()?.type;
</script>

<div class=" fixed w-full h-[100vh] bg-black/50 top-0 left-0 z-50 px-6">
	<div
		role="alert"
		class={'  relative top-8 rounded-md shadow-[4px_4px_#000000] z-50 w-full rounded-base shadow-light dark:shadow-dark font-heading border-2 border-border dark:border-darkBorder p-4 bg-main text-text transition ease-in-out duration-200 ' +
			(type === 'success' ? ' bg-primary' : ' bg-amber-600')}
		style={`transform: translateX(${translateValue});`}
	>
		<div class="flex items-center">
			<Terminal />
			<h5 class="mb-1 leading-none tracking-tight font-bold">{title}</h5>
		</div>
		<div class="text-sm font-base">
			{message}
		</div>
	</div>
</div>
