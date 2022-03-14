import { pipe, S } from '@mobily/ts-belt';

export const titleCase = (str: string) =>
	str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

export const kebabCase = (str: string) =>
	pipe(str, S.replaceByRe(/([a-z])([A-Z])/g, '$1-$2'), S.replaceAll(' ', '-'), S.toLowerCase);

export const searchComparison = (main: string, searchValue: string) =>
	!main || searchValue.toLowerCase().includes(main.toLowerCase());
