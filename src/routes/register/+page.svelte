<script lang="ts">
	import { authClient } from '$lib/auth-client';
	const formData = {
		email: 'test@gmail.com',
		password: '12345678',
		firstName: 'Henok',
		lastName: 'Ayenew',
		image: null
	};

	const register = async () => {
		const { email, password, firstName, lastName } = formData;
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			name: `${firstName} ${lastName}`
		});

		console.log(data, error);
	};
</script>

<div class="  p-6">
	<p class="text-2xl font-bold text-center">Sign Up</p>
	<form
		action=""
		class="flex flex-col w-full bg-primary p-4 rounded-md border border-black shadow-[2px_2px_#000000] mt-5"
	>
		<input
			type="email"
			class=" w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
			placeholder="Email"
			bind:value={formData.email}
		/>
		<input
			type="password"
			class=" w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
			placeholder="password"
			bind:value={formData.password}
		/>

		<div class="flex gap-2">
			<input
				type="text"
				class=" w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
				placeholder="First Name"
				bind:value={formData.firstName}
			/>
			<input
				type="text"
				class=" w-full border border-black rounded-md bg-secondary focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none"
				placeholder="Last Name ( optional )"
				bind:value={formData.lastName}
			/>
		</div>
		<div class="my-3">
			<p class="my-1">Profile Picture</p>
			<input
				type="file"
				name="profile"
				placeholder="Profile Pic"
				class="border border-black rounded-md hover:bg-secondary transition ease-in-out focus-visible:shadow-[1px_1px_#000000] my-3 p-3 focus-visible:outline-none cursor-pointer mb-6"
				id=""
				bind:files={formData.image}
			/>
		</div>

		<div class=" flex justify-center">
			<button
				onclick={register}
				class=" border rounded-md border-black p-2 bg-secondary shadow-[2px_2px_#000000] transition ease-in-out hover:shadow-none scale-105 hover:scale-100 w-2/3"
				>Register
			</button>
		</div>
	</form>
</div>
