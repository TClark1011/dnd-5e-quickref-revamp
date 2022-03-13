import { A, pipe } from '@mobily/ts-belt';

const convertObjectToCssStyles = (dict: Record<string, number | string>) =>
	pipe(
		dict,
		Object.entries,
		A.map(([key, value]) => `${key}: ${value};`),
		A.join(' ')
	);

export default convertObjectToCssStyles;
