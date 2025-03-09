<script lang="ts">
	import { fileSchema, type FileData } from '$lib/validations/fileSchema';
	import { z } from 'zod';
	import { Select } from 'bits-ui';
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

<form on:submit={handleSubmit} class="space-y-4 p-6">
	<div>
		<label for="file" class="block text-sm font-medium text-gray-700">Choose a file</label>
		<input
			id="file"
			type="file"
			accept="image/jpeg, image/png"
			on:change={handleFileChange}
			class="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		/>
		{#if errors.file}
			<p class="text-red-600 text-sm mt-1">{errors.file}</p>
		{/if}
	</div>

	<div>
		<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
		<input
			id="title"
			type="text"
			bind:value={title}
			class="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		/>
		{#if errors.title}
			<p class="text-red-600 text-sm mt-1">{errors.title}</p>
		{/if}
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea
			id="description"
			bind:value={description}
			class="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		></textarea>
		{#if errors.description}
			<p class="text-red-600 text-sm mt-1">{errors.description}</p>
		{/if}
	</div>

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
		<input
			id="price"
			type="number"
			bind:value={price}
			class="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		/>
		{#if errors.price}
			<p class="text-red-600 text-sm mt-1">{errors.price}</p>
		{/if}
	</div>

	<div>
		<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
		<select
			id="category"
			bind:value={categoryId}
			class="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		>
			<option value="">Select a Category</option>
			<option value="category-id-1">Category 1</option>
			<option value="category-id-2">Category 2</option>
		</select>

		<Select.Root type="single" onValueChange={(v) => (categoryId = v)}>
			<Select.Trigger
				class=" bg-primary/5   rounded-md     data-placeholder:text-foreground-alt/50 inline-flex w-full  my-5  select-none items-center border py-3 px-[11px] text-sm transition ease-in-out   border-primary  "
				aria-label="Select a theme"
			>
				<Tag class=" text-primary/50  mr-[9px] size-6" />
				{categoryId}
				<ChevronsUpDown class="text-muted-foreground ml-auto size-6 text-primary/50 " />
			</Select.Trigger>

			<Select.Portal>
				<Select.Content
					class="focus-override border-muted bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50  max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 transition ease-in-out bg-secondary   "
					sideOffset={10}
				>
					<Select.ScrollUpButton class="flex w-full items-center justify-center">
						<ChevronUp class="size-3" />
					</Select.ScrollUpButton>
					<Select.Viewport class="p-1">
						{#each categories as cat, i (i + cat)}
							<Select.Item
								class="rounded-button data-highlighted:bg-muted outline-hidden data-disabled:opacity-50 flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm  capitalize hover:bg-primary/10 transition ease-in-out "
								value={cat}
								label={cat}
							>
								{#snippet children({ selected })}
									{cat}
									{#if selected}
										<div class="ml-auto">
											<Check />
										</div>
									{/if}
								{/snippet}
							</Select.Item>
						{/each}
					</Select.Viewport>
					<Select.ScrollDownButton class="flex w-full items-center justify-center">
						<ChevronDown class="size-3" />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
		{#if errors.categoryId}
			<p class="text-red-600 text-sm mt-1">{errors.categoryId}</p>
		{/if}
	</div>
	<input
		id="title"
		type="text"
		bind:value={title}
		class="mt-1 block w-full text-gray-900 p-2 border border-primary focus-visible:outline-0 focus:ring-2 focus:ring-primary focus:border-primaring-primary transition duration-150 ease-in-out"
	/>

	<button
		type="submit"
		class="hover:shadow-[4px_4px_#5e503f] border-primary flex cursor-pointer items-center border p-2 px-7 transition ease-linear w-full flex justify-center"
		>Upload</button
	>
</form>

<style>
	/* Optional if you'd like to add custom styles */
	/* .error { color: red; font-size: 0.8rem; } */
</style>
