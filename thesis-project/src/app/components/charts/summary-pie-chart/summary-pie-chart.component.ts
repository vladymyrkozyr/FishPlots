import { Component } from "@angular/core";
import { ChartBase } from "../chart-base";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper";

@Component({
	selector: "summary-pie-chart",
	templateUrl: "./summary-pie-chart.component.html"
})
export class SummaryPieChartComponent extends ChartBase {

	constructor() {
		super();
	}

	renderChart() {
		// Create chart instance
		this.chart = am4core.create("summary-pie-chart", am4charts.PieChart);

		// Add data
		this.chart.data = [{
			"country": "Lithuania",
			"litres": 501.9
		}, {
			"country": "Czechia",
			"litres": 301.9
		}, {
			"country": "Ireland",
			"litres": 201.1
		}, {
			"country": "Germany",
			"litres": 165.8
		}, {
			"country": "Australia",
			"litres": 139.9
		}, {
			"country": "Austria",
			"litres": 128.3
		}, {
			"country": "UK",
			"litres": 99
		}, {
			"country": "Belgium",
			"litres": 60
		}, {
			"country": "The Netherlands",
			"litres": 50
		}];

		// Add and configure Series
		var pieSeries = this.chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";

		// Let's cut a hole in our Pie chart the size of 40% the radius
		this.chart.innerRadius = am4core.percent(40);

		// Put a thick white border around each Slice
		pieSeries.slices.template.stroke = am4core.color("#4a2abb");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;

		let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
		grouper.threshold = 10;
		grouper.groupName = "Other";
		grouper.clickBehavior = "break";

		// Add a legend
		this.chart.legend = new am4charts.Legend();
		this.chart.legend.position = "top";
	}

}
