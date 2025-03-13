<script lang="ts">
	import { fileSchema, type FileData } from '$lib/validations/fileSchema';
	import { z } from 'zod';
	import { Tag, ChevronsUpDown, ChevronDown, Check, ChevronUp } from 'lucide-svelte';

	const categories = ['cat 1', 'cat 2', 'cat 3'];

	let file: File | null = null;
	let title = '';
	let description = '';
	let price: number | null = null;
	let categoryId = '';
	let errors: Record<string, string> = {};

	// Handle file change
	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			file = input.files[0];
		}
	};

	// Handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		// Validate form data using Zod schema
		try {
			fileSchema.parse({ title, description, price, file, categoryId });
			errors = {}; // Clear any previous errors

			// Prepare form data to be sent to the API
			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('price', price!.toString()); // Ensure it's a string
			formData.append('categoryId', categoryId);
			if (file) formData.append('file', file);

			// Send form data to your API endpoint (backend)
			const response = await fetch('/api/supabase', {
				method: 'POST',
				body: formData // Send FormData (including file)
			});

			const result = await response.json();
			if (result.error) {
				console.error('Error uploading file:', result.error);
			} else {
				console.log('File uploaded and saved successfully!', result);
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				// Handle validation errors
				errors = err.errors.reduce(
					(acc: { [x: string]: any }, { path, message }: any) => {
						acc[path[0]] = message;
						return acc;
					},
					{} as Record<string, string>
				);
			} else {
				console.error('Error:', err);
			}
		}
	};
</script>

<form on:submit={handleSubmit} class="space-y-4 p-6 bg-primary/20 h-[100vh] overflow-auto">
	<div>
		<label for="file" class="block text-sm font-medium text-gray-700">Choose a file</label>
		<input
			id="file"
			type="file"
			accept="image/jpeg, image/png"
			on:change={handleFileChange}
			class="w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none cursor-pointer"
		/>
		{#if errors.file}
			<p class="border border-red-600 bg-red-600/10 rounded p-2 text-sm mt-1">{errors.file}</p>
		{/if}
	</div>

	<div>
		<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
		<input
			id="title"
			type="text"
			bind:value={title}
			class="w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
		/>
		{#if errors.title}
			<p class="border border-red-600 bg-red-600/10 rounded p-2 text-sm mt-1">{errors.title}</p>
		{/if}
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea
			id="description"
			bind:value={description}
			class="w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
		></textarea>
		{#if errors.description}
			<p class="border border-red-600 bg-red-600/10 rounded p-2 text-sm mt-1">
				{errors.description}
			</p>
		{/if}
	</div>

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
		<input
			id="price"
			type="number"
			bind:value={price}
			class="w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
		/>
		{#if errors.price}
			<p class="border border-red-600 bg-red-600/10 rounded p-2 text-sm mt-1">{errors.price}</p>
		{/if}
	</div>

	<div>
		<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
		<select
			id="category"
			bind:value={categoryId}
			class="w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
		>
			<option value="">Select a Category</option>
			<option value="category-id-1">Category 1</option>
			<option value="category-id-2">Category 2</option>
		</select>

		{#if errors.categoryId}
			<p class="border border-red-600 bg-red-600/10 rounded p-2 text-sm mt-1">
				{errors.categoryId}
			</p>
		{/if}
	</div>

	<button
		type="submit"
		class="hover:shadow-[4px_4px_#5e503f] border-primary cursor-pointer items-center border p-2 px-7 transition ease-linear w-full flex justify-center mt-5"
		>Upload</button
	>
</form>

<style>
	/* Optional if you'd like to add custom styles */
	/* .error { color: red; font-size: 0.8rem; } */
</style>
