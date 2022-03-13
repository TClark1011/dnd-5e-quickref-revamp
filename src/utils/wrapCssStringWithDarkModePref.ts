const wrapCssStringWithDarkModePref = (css: string) => `
@media (prefers-color-scheme: dark) {
	${css}
}`;

export default wrapCssStringWithDarkModePref;
