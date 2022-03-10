export type RuleItem = {
	title: string;
	icon: string;
	subtitle: string;
	description: string;
	reference: string;
	bullets: string[];
};

export type RuleSubSection = {
	description: string;
	items: RuleItem[];
};

export type RuleSection = {
	title: string;
	extraText: string;
	subSections: RuleSubSection[];
};
