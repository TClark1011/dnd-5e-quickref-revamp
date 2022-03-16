export const wrapCssStringWithDarkModePref = (css: string) => `
@media (prefers-color-scheme: dark) {
	${css}
}`;

export const wrapWithStyleTags = (css: string) => `<style>${css}</style>`;

export const wrapWithRootSelector = (styles: string) => `html { ${styles} }`;
