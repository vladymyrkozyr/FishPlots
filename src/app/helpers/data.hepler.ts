
export enum ProvincesEnum {
	NovaScotia = "Nova Scotia",
	NewBrunswick = "New Brunswick",
	PrinceEdwardIsland = "Prince Edward Island",
	Quebec = "Quebec",
	NewfoundlandAndLabrador = "Newfoundland and Labrador",
	BritishColumbia = "British Columbia"
}
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

	static fishTypesDefaultSelection: string[] = [
		"Cod",
		"Hake",
		"Eel",
		"Salmon",
		"Shark",
		"Oyster",
		"Shrimp",
		"Squid"
	].sort();

	static provincesColors: Map<ProvincesEnum, { Quantities: string; Values: string; }> =
		new Map<ProvincesEnum, { Quantities: string; Values: string; }>(
			[
				[ProvincesEnum.NovaScotia, { Quantities: "#a6cee3", Values: "#1f78b4" }],
				[ProvincesEnum.NewBrunswick, { Quantities: "#b2df8a", Values: "#33a02c" }],
				[ProvincesEnum.PrinceEdwardIsland, { Quantities: "#fb9a99", Values: "#e31a1c" }],
				[ProvincesEnum.Quebec, { Quantities: "#fdbf6f", Values: "#ff7f00" }],
				[ProvincesEnum.NewfoundlandAndLabrador, { Quantities: "#cab2d6", Values: "#6a3d9a" }],
				[ProvincesEnum.BritishColumbia, { Quantities: "#964b00", Values: "#1b0000" }]
			]
		);

	static provinces: ProvincesEnum[] = [
		ProvincesEnum.NovaScotia,
		ProvincesEnum.NewBrunswick,
		ProvincesEnum.PrinceEdwardIsland,
		ProvincesEnum.Quebec,
		ProvincesEnum.NewfoundlandAndLabrador,
		ProvincesEnum.BritishColumbia
	].sort();

	static provincesDefaultSelection: ProvincesEnum[] = [
		ProvincesEnum.NovaScotia,
		ProvincesEnum.Quebec,
		ProvincesEnum.BritishColumbia
	].sort();

	static years: string[] = [...Array(28).keys()].map(i => (1990 + i).toString());

	static parseStringValue(value: any): number {
		return parseFloat(!["-", "x", "X"].includes(String(value)) ? String(value).replace(",", "") : "0");
	}
}
