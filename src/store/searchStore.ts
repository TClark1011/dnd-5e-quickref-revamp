import { A, D, N, pipe } from '@mobily/ts-belt';
import { derived, writable } from 'svelte/store';
import { sortData } from '../logic';
import type { RuleItem, RuleSection, RuleSubSection } from '../types/ruleTypes';
import { searchComparison } from '../utils/stringHelpers';

const searchStore = writable('');

type SearchHelper<Entity, Return = Entity> = (a: string) => (b: Entity) => Return;

const filterRulesBySearch: SearchHelper<RuleItem[]> = (search) => (rules) =>
	rules.filter((item) => searchComparison(search, item.title));
export const filterSubSectionBySearch: SearchHelper<RuleSubSection> = (search) => (subSection) => ({
	...subSection,
	items: filterRulesBySearch(search)(subSection.items)
});

const deriveIfSubSectionIsVisible = (subSection: RuleSubSection) => !!subSection.items.length;
const deriveIfSectionIsVisible = (section: RuleSection) => !!section.subSections.length;

export const createVisibleRuleCounterStore = (rules: RuleItem[]) =>
	derived(searchStore, (search) => filterRulesBySearch(search)(rules).length);
export const createVisibleSubSectionsCounterStore = (subSections: RuleSubSection[]) =>
	derived(searchStore, (search) =>
		subSections.map(({ items }) => filterRulesBySearch(search)(items).length).reduce(N.add, 0)
	);

export const filterData = (sections: RuleSection[], search: string) =>
	pipe(
		sections,
		A.map(
			D.update('subSections', (subSections) =>
				pipe(
					subSections,
					// A.map(searchItemsInSubSection(search)),
					A.map((subSection) => ({
						...subSection,
						items: filterRulesBySearch(search)(subSection.items)
					})),
					A.filter(deriveIfSubSectionIsVisible)
				)
			)
		),
		A.filter(deriveIfSectionIsVisible)
	);

export const createProcessedDataStore = (data: RuleSection[]) =>
	derived(searchStore, (search) => pipe(filterData(data, search), sortData));

export default searchStore;
