import { D, B } from '@mobily/ts-belt';
import type { CardOptionsProps } from '../store';

export const toggleCardCollapsed: (p: CardOptionsProps) => CardOptionsProps = D.update(
	'collapsed',
	B.inverse
);

export const toggleCardHidden: (p: CardOptionsProps) => CardOptionsProps = D.update(
	'hidden',
	B.inverse
);
