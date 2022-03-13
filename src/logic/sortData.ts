import { D } from '@mobily/ts-belt';
import type { RuleSection } from '../types';
import { matchOrder } from '../utils';

const sortData = (arr: RuleSection[]) =>
	matchOrder(
		arr,
		['movement', 'action', 'bonus action', 'reaction', 'condition', 'environmental effects'],
		D.get('title')
	);

export default sortData;
