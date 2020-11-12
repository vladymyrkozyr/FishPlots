export class DataHelper {
	static startYear: number = 1990;
	static endYear: number = 2018;
	static yearsAmount: number = DataHelper.endYear - DataHelper.startYear;

	static fishTypes: string[] = [
		"Cod",
		"Haddock",
		"Redfish",
		"Halibut",
		"Flatfishes",
		"Pollock",
		"Hake",
		"Cusk",
		"Catfish",
		"Skate",
		"Dogfish",
		"Herring",
		"Mackerel",
		"Swordfish",
		"Tuna",
		"Alewife",
		"Eel",
		"Salmon",
		"Smelt",
		"Silversides",
		"Shark",
		"Capelin",
		"Oyster",
		"Scallop",
		"Squid",
		"Mussel",
		"Lobster",
		"Shrimp",
		"Crab, Queen",
		"Crab, Other",
		"Whelks",
		"Cockles"
	].sort();

	static provinces: string[] = [
		"Nova Scotia",
		"New Brunswick",
		"Prince Edward Island",
		"Quebec",
		"Newfoundland and Labrador",
		"British Columbia"
	].sort();

	static years: string[] = [...Array(28).keys()].map(i => (1990 + i).toString());

	static parseStringValue(value: any): number {
		return parseFloat(!["-", "x", "X"].includes(String(value)) ? String(value).replace(",", "") : "0");
	}
}
