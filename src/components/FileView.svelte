<script lang="ts">
	import { File } from 'lucide-svelte';

	import axios from 'axios';
	import { convertToDB } from 'better-auth/db';
	import { convertBytes } from '$lib/utils/file';

	const { file, download } = $props();

	let isDownloading = $state(false);

	let downloadedPercent = $state(0);

	const downloadFile = async (fileId: string) => {
		isDownloading = true;
		const response = await axios.get(`/api/files/download/${fileId}`, {
			responseType: 'blob', // Make sure to specify that we're expecting a Blob
			onDownloadProgress: (progressEvent) => {
				if (progressEvent.total) {
					const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
					downloadedPercent = progress;
				}
			}
		});

		const blob = response.data;
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', file.title); // or use the file name from the response if available
		document.body.appendChild(link);
		link.click();

		// Clean up after the download is triggered
		setTimeout(() => {
			document.body.removeChild(link);
			isDownloading = false;
			downloadedPercent = 0;
			window.URL.revokeObjectURL(url);
		}, 0);
	};
</script>

<div
	class="border-dark border-2 p-3 shadow-[4px_4px_#000000] rounded-md my-2 bg-secondary dark:bg-secondary-dark transition ease-in-out"
>
	<div class=" flex items-center justify-center">
		<div class=" flex flex-[0.2] flex-col items-center justify-center dark:text-secondary">
			<File />
			<small>{convertBytes(file.fileSize)}</small>
		</div>
		<p class=" mx-3 flex-[0.8] text-xl font-bold text-primary">
			A{file.title}
		</p>
	</div>

	<div class="flex flex-col mt-6 text-secondary-dark dark:text-secondary gap-3">
		<p>Author: <span class="font-bold"> {file.author.name}</span></p>
		<p>Price: <span class="font-bold"> ETB {file.price}</span></p>
		<p>
			Posted On: <span class="font-bold"> {new Date(file.createdAt).toLocaleDateString()}</span>
		</p>

		{#if download}
			<button
				disabled={isDownloading}
				onclick={() => downloadFile(file.id)}
				class="   bg-primary rounded mt-5 p-3 shadow-[4px_4px_#000] border-[2px] border-black hover:translate-[4px] hover:shadow-none transition ease-in-out disabled:grayscale-100"
				>Download</button
			>
		{/if}

		{#if isDownloading}
			<p>Downloading: <span class=" font-bold">{downloadedPercent}%</span></p>
		{/if}
	</div>
</div>
