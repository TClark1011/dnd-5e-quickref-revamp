import { pipe, F } from '@mobily/ts-belt';
import { get, type Unsubscriber, type Writable } from 'svelte/store';

const subscribeToStoreArray = <T, StoreHash>(
	stores: Writable<readonly Writable<T>[]>,
	callback: (p: T) => void,
	getStoreHash: (p: T) => StoreHash
) => {
	const subscribedStoreHashes: StoreHash[] = [];
	const unsubCallbacks: Unsubscriber[] = [];
	stores.subscribe((unwrappedStores) => {
		unwrappedStores.forEach((store) => {
			const storeHash = pipe(store, get, getStoreHash);
			if (!subscribedStoreHashes.includes(storeHash)) {
				unsubCallbacks.push(store.subscribe(callback));
				subscribedStoreHashes.push(storeHash);
			}
		});
	});
	return () => unsubCallbacks.forEach((u) => u());
};

export default subscribeToStoreArray;
