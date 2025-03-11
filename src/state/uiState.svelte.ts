let alert: string | null = $state(null);

export function changeAlert(message: string | null) {
	alert = message;
}

export function getAlert() {
	return alert;
}
