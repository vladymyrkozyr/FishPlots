import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from "src/app/services/data.service";
import { forkJoin } from "rxjs";
am4core.useTheme(am4themes_animated);

@Component({
	selector: "main-page",
	templateUrl: "./main-page.component.html",
	styleUrls: ["./main-page.component.scss"]
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

	fishTypesSelected: string[] = [...this.fishTypes];
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
	dataValues = {};
	summarizedDataByYearsAndProvinces = {};

	constructor(
		private dataService: DataService
	) { }

	ngOnInit(): void { }

	getTestFile(): void {

		let fileRequestsQuantities = [];
		let fileRequestsValues = [];

		for (let i: number = 1990; i <= 2018; i++) {
			fileRequestsQuantities.push(this.dataService.getFileByUrl(`assets/files/json/sea fish quantities/s${i}pq_e.json`));
			fileRequestsValues.push(this.dataService.getFileByUrl(`assets/files/json/sea fish values/s${i}pv_e.json`));
		}

		forkJoin([...fileRequestsQuantities, ...fileRequestsValues]).subscribe((files:any[]) => {

			console.log(files)

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

				this.dataValues[i + 1990] = files[i + 29].map(d => <any>{
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
			console.log(this.dataValues);

			this.lineChartSummarizedByProvinces();
		});
	}

	parseStringValue(value: any): number {
		return parseFloat(!["-", "x", "X"].includes(String(value)) ? String(value).replace(",", "") : "0");
	}

	lineChartSummarizedByProvinces() {
		let data = [];
		for(let i: number = 1990; i <= 2018; i++){
			console.log(this.dataQuantities[i]);
			// console.log(this.dataQuantities[i].reduce((sum, current) => sum + current["British Columbia"], 0))
			 data.push({
                 year:i.toString(),

                //  this.provinces.map(p=><any>{

                //  })

				 value1:this.dataQuantities[i].filter(d=>this.fishTypesSelected.includes(d.fishType)).reduce((sum, current) => sum + current["British Columbia"], 0),
				 value2:this.dataQuantities[i].filter(d=>this.fishTypesSelected.includes(d.fishType)).reduce((sum, current) => sum + current["Quebec"], 0)

				})
		}

		let chart = am4core.create("chartdiv", am4charts.XYChart);
		chart.data = data;

		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "year";
		categoryAxis.renderer.minGridDistance = 50;
		categoryAxis.renderer.grid.template.location = 0.5;
		categoryAxis.startLocation = 0.5;
		categoryAxis.endLocation = 0.5;

		// Create value axis
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.baseValue = 0;

		// Create series
		let series1 = chart.series.push(new am4charts.LineSeries());
		series1.dataFields.valueY = "value1";
		series1.dataFields.categoryX = "year";
		series1.strokeWidth = 2;
		series1.name = "British Columbia";

		let series2 = chart.series.push(new am4charts.LineSeries());
		series2.dataFields.valueY = "value2";
		series2.dataFields.categoryX = "year";
		series2.strokeWidth = 2;
		series2.name = "Quebec";



		//series.tensionX = 0.77;

		// bullet is added because we add tooltip to a bullet for it to change color
		// let bullet = series.bullets.push(new am4charts.Bullet());
		// bullet.tooltipText = "{valueY}";

		// bullet.adapter.add("fill", function (fill, target) {
		// 	if (target.dataItem.valueY < 0) {
		// 		return am4core.color("#FF0000");
		// 	}
		// 	return fill;
		// })
		// let range = valueAxis.createSeriesRange(series);
		// range.value = 0;
		// range.endValue = -1000;
		// range.contents.stroke = am4core.color("#FF0000");
		// range.contents.fill = range.contents.stroke;

		// Add scrollbar
		var scrollbarX = new am4charts.XYChartScrollbar();
		scrollbarX.series.push(series1);
		scrollbarX.series.push(series2);
		chart.scrollbarX = scrollbarX;

		chart.legend = new am4charts.Legend();

		chart.legend.position = "top";

		chart.cursor = new am4charts.XYCursor();
	}

}
