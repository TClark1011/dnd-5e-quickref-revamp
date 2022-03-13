const checkUserDarkModePref = () =>
	window && window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)')?.matches;

export default checkUserDarkModePref;
