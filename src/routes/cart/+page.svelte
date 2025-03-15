<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import FileView from '../../components/FileView.svelte';
	import { Barcode, LoaderCircle } from 'lucide-svelte';
	import { generateRandomString } from 'better-auth/crypto';
	import { notify } from '$state/uiState.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let { data } = $props();

	let user: any = data.user;

	let cart: any[] = $state([]);

	let transactionLoading = $state(false);

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
			return_url: `${PUBLIC_BASE_URL}/verify?tx_ref=${txRef}`,
			digital_files: cart.map((f) => f.id)
		};

		transactionLoading = true;

		try {
			const res = await fetch('/api/transactions', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			let result = await res.json();

			if (result.error) {
				notify('Checkout Failed', result.error.message, 'error');
				transactionLoading = false;
			} else {
				transactionLoading = false;
				notify(
					'Transaction Pending',
					'You will be redirected to chapa checkout page to finish the transaction',
					'success'
				);
				window.location = result.checkoutUrl;
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

{#if transactionLoading}
	<div
		class=" w-full h-[100vh] bg-black/50 top-0 left-0 fixed z-50 flex justify-center items-center"
	>
		<LoaderCircle class=" animate-spin text-primary  " size={50} />
	</div>
{/if}

<div class=" p-4 h-[93.7vh] bg-primary/10">
	{#each cart as file}
		<FileView {file} />
	{/each}

	<p class=" my-2 dark:text-secondary">
		Subtotal: <span class=" font-bold">ETB {calculateTotalPrice(cart)}</span>
	</p>

	<button
		onclick={checkout}
		class=" w-full bg-primary flex items-center justify-center p-2 rounded-sm transition ease-in-out text-black shadow-[3px_3px_#000000] hover:translate-[3px] hover:shadow-none border-[3px] border-black"
	>
		<Barcode /> <span class="mx-2">Checkout</span></button
	>
</div>
