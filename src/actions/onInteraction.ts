const onInteraction = <Node extends HTMLElement>(node: Node, callback: (p: Node) => void) => {
	const onClick = () => callback(node);
	node.addEventListener('click', onClick);

	const onKey = (e: KeyboardEvent) => {
		if (['Space', 'Enter'].includes(e.code)) {
			callback(node);
		}
	};
	node.addEventListener('keyup', onKey);

	return {
		destroy: () => {
			node.removeEventListener('click', onClick);
			node.removeEventListener('keyup', onKey);
		}
	};
};

export default onInteraction;
