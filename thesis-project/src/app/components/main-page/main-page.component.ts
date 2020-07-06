import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from 'src/app/services/data.service';
import { forkJoin } from 'rxjs';
am4core.useTheme(am4themes_animated);

@Component({
	selector: 'main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

	fishTypes: string[] = [
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

	provinces: string[] = [
		"Nova Scotia",
		"New Brunswick",
		"Prince Edward Island",
		"Quebec",
		"Newfoundland and Labrador",
		"British Columbia"
	].sort();

	years: string[] = [...Array(28).keys()].map(i => (1990 + i).toString());

	fishTypesSelected: string[] = [];
	provincesSelected: string[] = [];
	yearsSelected: string[] = [];

	isFishTypeSelected = (item: string): boolean => {
		return this.fishTypesSelected.some(fishType => fishType == item);
	}

	onFishTypesChange(event) {
		console.log(event);
	}

	isProvinceSelected = (item: string): boolean => {
		return this.provincesSelected.some(province => province == item);
	}

	onProvincesChange(event) {
		console.log(event);
	}

	isYearSelected = (item: string): boolean => {
		return this.yearsSelected.some(year => year == item);
	}

	onYearsChange(event) {
		console.log(event);
	}

	dataQuantities = {};

	constructor(
		private dataService: DataService
	) { }

	ngOnInit(): void { }

	getTestFile(): void {
		this.dataService.getTestFile().subscribe(r => {
			let chart: am4charts.PieChart = am4core.create("chartdiv", am4charts.PieChart);
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			let data = r.map(d => <any>{ fishType: d["Species"], value: String(d["British Columbia"]) });
			console.log(data.map(d => <any>{ ...d, value: parseFloat(d.value != "-" ? d.value.replace(',', '') : 0) }))
			data = data.map(d => <any>{ ...d, value: parseFloat(d.value != "-" ? d.value.replace(',', '') : 0) });
			// r.map(d=><any>{fishType:d["Species"], value: d["British Columbia"].replace(",", "")})
			chart.data = data;
			pieSeries.dataFields.value = "value";
			pieSeries.dataFields.category = "fishType";
			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;

			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;
		});

		let fileRequests = [];

		for (let i: number = 1990; i <= 2018; i++) {
			fileRequests.push(this.dataService.getFileByUrl("assets/files/json/sea fish quantities/s1991pq_e.json"));
		}

		forkJoin(fileRequests).subscribe((files: any[]) => {

			for (let i: number = 0; i <= 28; i++) {
				this.dataQuantities[i + 1990] = files[i].map(d => <any>{
					fishType: d["Species"],
					"Nova Scotia": this.parseStringValue(d["Nova Scotia"]),
					"New Brunswick": this.parseStringValue(d["New Brunswick"]),
					"Prince Edward Island": this.parseStringValue(d["Prince Edward Island"]),
					"Quebec": this.parseStringValue(d["Quebec"]),
					"Newfoundland and Labrador": this.parseStringValue(d["Newfoundland and Labrador"]),
					"British Columbia": this.parseStringValue(d["Nova Scotia"])
				}).filter(d => d.fishType != "");
			}

			console.log(this.dataQuantities);
		});
	}

	parseStringValue(value: any): number {
		return parseFloat(!["-", "x", "X"].includes(String(value)) ? String(value).replace(",", "") : "0");
	}

}
