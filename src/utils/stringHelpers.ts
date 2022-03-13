import { pipe, S } from '@mobily/ts-belt';

export const titleCase = (str: string) =>
	str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

// export const kebabCase = (str:string) => {
// 	const result = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// 	return result.charAt(0) === '-' ? result.slice(1) : result;
// }

export const kebabCase = (str: string) =>
	pipe(str, S.replaceByRe(/([a-z])([A-Z])/g, '$1-$2'), S.replaceAll(' ', '-'), S.toLowerCase);
