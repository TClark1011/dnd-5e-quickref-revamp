import { A, B, D, F, flow, pipe } from '@mobily/ts-belt';
import { get, writable, type Writable } from 'svelte/store';

export type CardOptionsProps = {
	collapsed: boolean;
	hidden: boolean;
	title: string;
};

type CardOptionStore = Writable<CardOptionsProps>;

type CardOptionAction<Returns = CardOptionsProps> = (p: CardOptionsProps) => Returns;

export const toggleCardCollapsed: CardOptionAction = D.update('collapsed', B.inverse);
export const toggleCardHidden: CardOptionAction = D.update('hidden', B.inverse);

const cardOptionsState = writable<readonly CardOptionStore[]>([]);

export const updateAllCardOptions = (
	callback: CardOptionAction,
	condition?: CardOptionAction<boolean>
) =>
	get(cardOptionsState).map(
		F.tap((store) => {
			if (!condition || condition(get(store))) {
				store.update(callback);
			}
		})
	);

export const updateSpecificStore = (name: string, updater: CardOptionAction) =>
	updateAllCardOptions(updater, flow(D.get('title'), F.equals(name)));

export const getAllCardOptions = () => get(cardOptionsState).map(get);

const checkIfCardOptionStoreIsRegistered: (p: CardOptionStore) => boolean = flow(
	get,
	D.get('title'),
	(title) => pipe(getAllCardOptions(), A.map(D.get('title')), A.includes(title))
);

export const registerNewCardOptionStore = (store: CardOptionStore) => {
	if (!checkIfCardOptionStoreIsRegistered(store)) {
		cardOptionsState.update(A.append(store));
	}
};

export default cardOptionsState;
