export type CompareStringOptions = {
	caseSensitive: boolean;
};

const compareStrings = (a: string, b: string, { caseSensitive = true } = {}): number => {
	// uses levenshtein distance
	// copilot wrote this so I don't really understand it
	const first = caseSensitive ? a : a.toLowerCase();
	const second = caseSensitive ? b : b.toLowerCase();
	const diffMatrix: number[][] = [];

	for (let i = 0; i <= first.length; i++) {
		diffMatrix[i] = [];
		diffMatrix[i][0] = i;
	}
	for (let j = 0; j <= second.length; j++) {
		diffMatrix[0][j] = j;
	}
	for (let i = 1; i <= first.length; i++) {
		for (let j = 1; j <= second.length; j++) {
			if (first.charAt(i - 1) === second.charAt(j - 1)) {
				diffMatrix[i][j] = diffMatrix[i - 1][j - 1];
			} else {
				diffMatrix[i][j] = Math.min(
					diffMatrix[i - 1][j - 1] + 1,
					Math.min(diffMatrix[i][j - 1] + 1, diffMatrix[i - 1][j] + 1)
				);
			}
		}
	}
	return diffMatrix[first.length][second.length];
};

export default compareStrings;
