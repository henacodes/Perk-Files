<script>
	import { BookPlus, UserRoundCog, Files, Newspaper, House, ShoppingCart } from 'lucide-svelte';

	const { onclick } = $props();
</script>

<div class=" fixed top-0 left-0 w-full h-[100vh] bg-black/20" {onclick}></div>
<div
	class="absolute bg-primary border-2 border-black right-20 p-4 top-0 min-w-[12rem] rounded-md transition ease-in-out"
>
	<p class=" text-xl font-bold mb-2">My Account</p>
	<ul>
		<a {onclick} href="/">
			<li
				class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
			>
				<House /> Home
			</li>
		</a>
		<a {onclick} href="/feed">
			<li
				class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
			>
				<Newspaper /> Feed
			</li>
		</a>
		<a {onclick} href="/post">
			<li
				class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
			>
				<BookPlus /> New Post
			</li>
		</a>
		<a {onclick} href="/my-files">
			<li
				class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
			>
				<Files /> My Files
			</li>
		</a>
		<a {onclick} href="/cart">
			<li
				class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
			>
				<ShoppingCart /> Cart
			</li>
		</a>
		<a {onclick} href="#"></a>

		<li
			class=" hover:border hover:border-black rounded-md p-2 flex items-center gap-2 cursor-pointer"
		>
			<UserRoundCog /> Profile
		</li>
	</ul>
</div>
