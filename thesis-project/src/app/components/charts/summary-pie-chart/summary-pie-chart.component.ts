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

	chartQuantities: am4charts.PieChart;
	chartValues: am4charts.PieChart;

	constructor() {
		super();
	}

	renderChart(data: any) {
		this.renderChartQuantities(data.quantities);
		this.renderChartValues(data.values);
	}

	renderChartQuantities(data: any[]) {
		// Create chart instance
		this.chartQuantities = am4core.create("summary-pie-chart-quantities", am4charts.PieChart);

		// Add data
		this.chartQuantities.data = data;

		// Add and configure Series
		var pieSeries = this.chartQuantities.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "quantity";
		pieSeries.dataFields.category = "fishType";

		// Let's cut a hole in our Pie chart the size of 40% the radius
		this.chartQuantities.innerRadius = am4core.percent(40);

		// Put a thick white border around each Slice
		pieSeries.slices.template.stroke = am4core.color("#4a2abb");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;

		let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
		grouper.threshold = 10;
		grouper.groupName = "Other";
		grouper.clickBehavior = "break";

		// Add a legend
		this.chartQuantities.legend = new am4charts.Legend();
		this.chartQuantities.legend.position = "top";

		let title = this.chartQuantities.titles.create();
		title.text = "Quantities";
		title.fontSize = 25;
	}

	renderChartValues(data: any[]) {
		// Create chart instance
		this.chartValues = am4core.create("summary-pie-chart-values", am4charts.PieChart);

		// Add data
		this.chartValues.data = data;

		// Add and configure Series
		var pieSeries = this.chartValues.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "value";
		pieSeries.dataFields.category = "fishType";

		// Let's cut a hole in our Pie chart the size of 40% the radius
		this.chartValues.innerRadius = am4core.percent(40);

		// Put a thick white border around each Slice
		pieSeries.slices.template.stroke = am4core.color("#4a2abb");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;

		let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
		grouper.threshold = 10;
		grouper.groupName = "Other";
		grouper.clickBehavior = "break";

		// Add a legend
		this.chartValues.legend = new am4charts.Legend();
		this.chartValues.legend.position = "top";

		let title = this.chartValues.titles.create();
		title.text = "Values";
		title.fontSize = 25;
	}

	ngOnDestroy() {
		this.chartQuantities?.dispose();
		this.chartValues?.dispose();
	}

}
