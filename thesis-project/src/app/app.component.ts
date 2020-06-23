import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from './services/data.service';
am4core.useTheme(am4themes_animated);

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "thesis-project";

	//private chart: am4charts.XYChart;

	constructor(
		private zone: NgZone,
		private dataService: DataService
	) { }

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			let chart = am4core.create("chartdiv2", am4charts.XYChart);

			chart.paddingRight = 20;

			let data = [];
			let visits = 10;
			for (let i = 1; i < 366; i++) {
				visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
				data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
			}

			chart.data = data;

			let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
			dateAxis.renderer.grid.template.location = 0;

			let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.tooltip.disabled = true;
			valueAxis.renderer.minWidth = 35;

			let series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.dateX = "date";
			series.dataFields.valueY = "value";

			series.tooltipText = "{valueY.value}";
			chart.cursor = new am4charts.XYCursor();

			let scrollbarX = new am4charts.XYChartScrollbar();
			scrollbarX.series.push(series);
			chart.scrollbarX = scrollbarX;

			//this.chart = chart;
		});
	}

	ngOnDestroy() {
		this.zone.runOutsideAngular(() => {
			// if (this.chart) {
			// 	this.chart.dispose();
			// }
		});
	}

	getTestFile() {
		this.dataService.getTestFile().subscribe(r => {
			let chart: am4charts.PieChart = am4core.create("chartdiv", am4charts.PieChart);
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			let data = r.map(d => <any>{ fishType: d["Species"], value: String(d["British Columbia"]) });
			console.log(data.map(d => <any>{ ...d, value: parseFloat(d.value!="-"?d.value.replace(',', ''):0) }))
			data = data.map(d => <any>{ ...d, value: parseFloat(d.value!="-"?d.value.replace(',', ''):0) });
			// r.map(d=><any>{fishType:d["Species"], value: d["British Columbia"].replace(",", "")})
			chart.data=data;
			pieSeries.dataFields.value = "value";
			pieSeries.dataFields.category = "fishType";
			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;

			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;
		})
	}
}
