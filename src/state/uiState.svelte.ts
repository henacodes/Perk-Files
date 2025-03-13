interface Alert {
	title: string;
	message: string;
}

let alert: Alert | null = $state(null);

const DARK = 'dark';
const LIGHT = 'light';
type ThemeType = 'light' | 'dark';

let theme: ThemeType = $state(LIGHT);

export function notify(title: string, message: string = '') {
	alert = { title, message };
	setTimeout(() => {
		alert = null;
	}, 3000);
}

export function switchTheme() {
	let isAlreadyDark = document.documentElement.classList.contains('dark');
	if (isAlreadyDark) {
		theme = LIGHT;

		removeThemeFromClassList(DARK);
		addThemeToClassList(LIGHT);
	} else {
		theme = 'dark';
		removeThemeFromClassList(LIGHT);
		addThemeToClassList(DARK);
	}
}

function removeThemeFromClassList(theme: ThemeType) {
	document.documentElement.classList.remove(theme);
}
function addThemeToClassList(theme: ThemeType) {
	document.documentElement.classList.add(theme);
}

export function getTheme() {
	return theme;
}

export function getAlert() {
	return alert;
}
