<script lang="ts">
	import Avatar from './Avatar.svelte';
	import { ShoppingCart } from 'lucide-svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div
	class="  w-full p-3 border-b-2 border-black bg-secondary dark:bg-secondary-dark flex items-center justify-between"
>
	<p class=" text-primary px-2 text-3xl font-bold p-1 rounded">PerkFiles.</p>

	<div class="flex gap-2 items-center">
		<ThemeSwitch />
		<Avatar alt="Henok AYenew" />
	</div>
</div>
