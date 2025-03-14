interface Alert {
	title: string;
	message: string;
	type: ErrorTypes;
}

let alert: Alert | null = $state(null);

const DARK = 'dark';
const LIGHT = 'light';
type ThemeType = 'light' | 'dark';

let theme: ThemeType = $state(LIGHT);
const theOppositeTheme = (theme: ThemeType): ThemeType => (theme === 'dark' ? 'light' : 'dark');

type ErrorTypes = 'success' | 'error';
export function notify(title: string, message: string = '', errorType: ErrorTypes = 'success') {
	alert = { title, message, type: errorType };
	setTimeout(() => {
		alert = null;
	}, 3000);
}

export function switchTheme() {
	console.log(theme);
	updateHTMLClass(theOppositeTheme(theme));
	localStorage.setItem('theme', theme);
}

export function loadTheme() {
	let currTheme = localStorage.getItem('theme') as ThemeType;
	if (!currTheme) {
		localStorage.setItem('theme', LIGHT);
		currTheme = LIGHT;
	}
	updateHTMLClass(currTheme);

	console.log(theme);
}

function updateHTMLClass(currTheme: ThemeType) {
	//let isAlreadyDark = document.documentElement.classList.contains('dark');
	theme = currTheme;
	removeThemeFromClassList(theOppositeTheme(theme));
	addThemeToClassList(theme);
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
