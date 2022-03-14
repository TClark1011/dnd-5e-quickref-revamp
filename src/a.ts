import { derived } from 'svelte/store';
import data from './data';
import searchStore, { filterData } from './store/searchStore';

export const processedDataStore = derived(searchStore, (search) => filterData(data, search));
