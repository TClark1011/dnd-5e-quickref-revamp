import { derived, writable } from 'svelte/store';
import type { RuleItem } from '../types/ruleTypes';
import { searchComparison } from '../utils';
import type { RuleSubSection, RuleSection } from '../types/ruleTypes';
import { A, D, flow, N, pipe } from '@mobily/ts-belt';

const searchState = writable('');

type SearchHelper<Entity, Returns = Entity> = (a: string) => (b: Entity) => Returns;

const doesSubSectionHaveItems = (subSection: RuleSubSection) =>
	pipe(subSection, D.get('items'), A.isNotEmpty);

const doesRuleMatchSearch: SearchHelper<RuleItem, boolean> = (search) => (rule) =>
	searchComparison(search, rule.title);
const filterSubSection: SearchHelper<RuleSubSection> = (search) =>
	D.update('items', A.filter(doesRuleMatchSearch(search)));
const filterSection: SearchHelper<RuleSection> = (search) =>
	D.update('subSections', flow(A.map(filterSubSection(search)), A.filter(doesSubSectionHaveItems)));

export const deriveIfRuleIsVisible = (rule: RuleItem) =>
	derived(searchState, ($search) => doesRuleMatchSearch($search)(rule));
export const deriveIfSubSectionIsVisible = (subSection: RuleSubSection) =>
	derived(searchState, ($search) => !!filterSubSection($search)(subSection).items.length);
export const deriveIfSectionIsVisible = (section: RuleSection) =>
	derived(searchState, ($search) => !!filterSection($search)(section).subSections.length);

const deriveSearchedData = (data: RuleSection[]) =>
	derived(searchState, ($search) => A.map(data, filterSection($search)));

const countSubSectionItems = (subSection: RuleSubSection) =>
	pipe(subSection, D.get('items'), A.length);
const countSectionItems = (section: RuleSection) =>
	pipe(section, D.get('subSections'), A.map(countSubSectionItems), A.reduce(0, N.add));

export const deriveNumberOfVisibleItems = (data: RuleSection[]) =>
	derived(deriveSearchedData(data), flow(A.map(countSectionItems), A.reduce(0, N.add)));

export default searchState;
