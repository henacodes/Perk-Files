<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class=" bg-secondary">
	{@render children()}
</div>
