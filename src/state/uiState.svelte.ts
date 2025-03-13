interface Alert {
	title: string;
	message: string;
}

let alert: Alert | null = $state(null);

export function notify(title: string, message: string = '') {
	alert = { title, message };
	setTimeout(() => {
		alert = null;
	}, 3000);
}

export function getAlert() {
	return alert;
}
