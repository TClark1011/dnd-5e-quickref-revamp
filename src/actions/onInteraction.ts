const onInteraction = <Node extends HTMLElement>(node: Node, callback: (p: Node) => void) => {
	const currentTabIndex = node.getAttribute('tabIndex');
	node.setAttribute('tabIndex', currentTabIndex || '0');

	const onClick = () => callback(node);
	const onKey = (e: KeyboardEvent) => {
		if (['Space', 'Enter'].includes(e.code)) {
			callback(node);
		}
	};

	node.addEventListener('click', onClick);
	node.addEventListener('keyup', onKey);

	return {
		destroy: () => {
			node.removeEventListener('click', onClick);
			node.removeEventListener('keyup', onKey);
		}
	};
};

export default onInteraction;
