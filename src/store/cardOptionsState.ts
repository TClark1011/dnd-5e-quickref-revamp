import { B, D, F, flow } from '@mobily/ts-belt';
import { get, writable, type Writable } from 'svelte/store';

export type CardOptionsProps = {
	collapsed: boolean;
	hidden: boolean;
	title: string;
};

type CardOptionAction<Returns = CardOptionsProps> = (p: CardOptionsProps) => Returns;

export const toggleCardCollapsed: CardOptionAction = D.update('collapsed', B.inverse);
export const toggleCardHidden: CardOptionAction = D.update('hidden', B.inverse);

const cardOptionsState = writable<readonly Writable<CardOptionsProps>[]>([]);

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

export default cardOptionsState;
