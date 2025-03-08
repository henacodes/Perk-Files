<script lang="ts">
	import '../app.css';
	import { Button } from 'bits-ui';
	import { Label, Switch } from 'bits-ui';
	import { Progress, useId } from 'bits-ui';
	import { onMount } from 'svelte';
	let { children } = $props();

	let value = $state(13);
	const labelId = useId();

	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<div class=" bg-secondary">
	{@render children()}
</div>
