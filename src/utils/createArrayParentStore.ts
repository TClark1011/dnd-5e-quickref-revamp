import { A, F, flow, pipe } from '@mobily/ts-belt';
import { get, writable, type Writable } from 'svelte/store';
import subscribeToStoreArray from './subscribeToStoreArray';

type ParentStore<T> = Writable<readonly Writable<T>[]>;

export const getChildValuesOfParentStoreArray = <T>(parentStore: ParentStore<T>) =>
	pipe(parentStore, get, A.map(get));

export const updateStore =
	<T>(callback: (p: T) => T) =>
	(store: Writable<T>) =>
		store.update(callback);

const createArrayParentStore = <T, Hash>(
	hasher: (p: T) => Hash,
	storeCreator: (p: T) => Writable<T> = writable
) => {
	const parentStore = writable<readonly Writable<T>[]>([]);

	const getAllChildValues = () => getChildValuesOfParentStoreArray(parentStore);

	const createNewChildStore = (initialStoreData: T) => {
		const existingStore = pipe(
			parentStore,
			get,
			A.find(flow(get, hasher, F.equals(initialStoreData)))
		) as unknown as Writable<T>;

		if (existingStore) {
			return existingStore;
		} else {
			const newStore = storeCreator(initialStoreData);
			parentStore.update(A.append(newStore));
			return newStore;
		}
	};

	const subscribeToAllChildren = (callback: (p: T) => void) =>
		subscribeToStoreArray(parentStore, callback, hasher);

	const updateChildren = (mapper: (p: T) => T, condition: (p: T) => boolean = F.always(true)) =>
		pipe(parentStore, get, A.forEach(F.when(flow(get, condition), F.tap(updateStore(mapper)))));

	const updateSpecificChild = (target: Hash, updater: (p: T) => T) => {
		updateChildren(updater, flow(hasher, F.equals(target)));
	};

	return {
		parentStore,
		createNewChildStore,
		subscribeToAllChildren,
		getAllChildValues,
		updateChildren,
		updateSpecificChild
	};
};

export default createArrayParentStore;
