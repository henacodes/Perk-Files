<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import FileView from '../../components/FileView.svelte';
	import { Barcode } from 'lucide-svelte';
	import { generateRandomString } from 'better-auth/crypto';

	let { data } = $props();

	let user: any = data.user;

	let cart: any[] = $state([]);

	onMount(() => {
		if (browser) {
			let files = JSON.parse(localStorage.getItem('file-cart') || '');
			console.log('files', files);
			if (files) {
				cart = files;
			}
		}
	});

	function calculateTotalPrice(files: any[]) {
		return files.reduce((total, file) => total + parseFloat(file.price), 0);
	}

	async function checkout() {
		let name = user.name.split(' ');
		let txRef = generateRandomString(10);
		let payload = {
			amount: calculateTotalPrice(cart),
			currency: 'ETB',
			email: user.email,
			first_name: name[0],
			tx_ref: txRef,
			last_name: name[1],
			callback_url: 'http://localhost:5173/api/chapa/callback',
			return_url: `http://localhost:5173/verify?tx_ref=${txRef}`,
			digital_files: cart.map((f) => f.id)
		};

		console.log(payload);

		try {
			const res = await fetch('/api/transactions', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			let result = await res.json();
			if (result) {
				window.location = result.checkoutUrl;
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class=" p-4">
	{#each cart as file}
		<FileView />
	{/each}

	<p class=" my-2">Subtotal: {calculateTotalPrice(cart)}</p>

	<button
		onclick={checkout}
		class=" w-full bg-primary text-secondary flex items-center justify-center p-2"
	>
		<Barcode /> <span class="mx-2">Checkout</span></button
	>
</div>
