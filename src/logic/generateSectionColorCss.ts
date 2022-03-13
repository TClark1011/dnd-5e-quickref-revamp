import { A, D, F, pipe } from '@mobily/ts-belt';
import { darken } from 'polished';
import type { RuleSection } from '../types';
import {
	convertObjectToCssStyles,
	kebabCase,
	wrapWithStyleTags,
	wrapWithRootSelector,
	wrapCssStringWithDarkModePref
} from '../utils';

const convertTitleToSectionColorVarName = (title: string) => `--section-color-${kebabCase(title)}`;

const extractColorVarFromSection = ({ title, color }: RuleSection) => ({
	[convertTitleToSectionColorVarName(title)]: color
});

const getColorVarObject = (data: RuleSection[]) =>
	pipe(data, A.map(extractColorVarFromSection), A.reduce({}, D.merge));

const generateCss = (
	colorVars: Record<string, string>,
	colorChanger: (p: string) => string = F.identity,
	helper: (p: string) => string = F.identity
) =>
	pipe(
		colorVars,
		D.map(colorChanger),
		convertObjectToCssStyles,
		wrapWithRootSelector,
		helper,
		wrapWithStyleTags
	);

const generateSectionColorCss = (data: RuleSection[]) => {
	const colorVars = getColorVarObject(data);
	const lightModeStyles = generateCss(colorVars);
	const darkModeStyles = generateCss(colorVars, darken(0.15), wrapCssStringWithDarkModePref);
	return { lightModeStyles, darkModeStyles };
};

export default generateSectionColorCss;
