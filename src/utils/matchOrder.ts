import { F } from '@mobily/ts-belt';

const matchOrder = <Item, Value>(
	arr: Item[],
	order: Value[],
	deriver: (p: Item) => Value
): Item[] => {
	const getIndexInOrder = (item: Item) => order.findIndex((i) => F.equals(i, deriver(item)));
	const sorted = [...arr].sort((a, b) => getIndexInOrder(a) - getIndexInOrder(b));
	return sorted;
};

export default matchOrder;
