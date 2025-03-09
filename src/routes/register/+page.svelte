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
	<p class="text-2xl font-bold text-center">Sign-In</p>
	<form action="" class="flex flex-col w-full">
		<input
			type="email"
			class=" w-full border-b border-primary my-3 p-3 focus-visible:outline-none"
			placeholder="Email"
			bind:value={formData.email}
		/>
		<input
			type="password"
			class=" w-full border-b border-primary my-3 p-3 focus-visible:outline-none"
			placeholder="password"
			bind:value={formData.password}
		/>

		<div class="flex">
			<input
				type="text"
				class=" w-full border-b mx-1 border-primary my-3 p-3 focus-visible:outline-none"
				placeholder="First Name"
				bind:value={formData.firstName}
			/>
			<input
				type="text"
				class=" w-full border-b mx-1 border-primary my-3 p-3 focus-visible:outline-none"
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
				class="bg-primary/20 cursor-pointer rounded p-2 mb-6"
				id=""
				bind:files={formData.image}
			/>
		</div>

		<button
			onclick={register}
			class=" border border-primary p-2 hover:shadow-[4px_4px_#5e503f] transition ease-in-out"
			>Register
		</button>
	</form>
</div>
