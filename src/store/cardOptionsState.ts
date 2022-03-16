import { D } from '@mobily/ts-belt';
import { writable as localStorageWritable } from 'svelte-local-storage-store';
import createArrayParentStore from '../utils/createArrayParentStore';

export type CardOptionsProps = {
	collapsed: boolean;
	hidden: boolean;
	title: string;
};

export const {
	parentStore: cardOptionsState,
	createNewChildStore: createNewCardOptionStore,
	getAllChildValues: getAllCardOptions,
	subscribeToAllChildren: subscribeToAllCardOptionStores,
	updateChildren: updateCardOptionStores,
	updateSpecificChild: updateCardOptionStoreWithTitle
} = createArrayParentStore<CardOptionsProps, string>(D.get('title'), (options) =>
	localStorageWritable(`${options.title}-options-store`, options)
);

export default cardOptionsState;
