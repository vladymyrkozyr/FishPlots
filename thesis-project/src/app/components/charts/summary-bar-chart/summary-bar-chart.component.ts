import { Component } from "@angular/core";
import { ChartBase } from "../chart-base";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
	selector: "summary-bar-chart",
	templateUrl: "./summary-bar-chart.component.html"
})
export class SummaryBarChartComponent extends ChartBase {

	constructor() {
		super();
	}

	renderChart() {
		// Create chart instance
		this.chart = am4core.create("summary-bar-chart", am4charts.XYChart);

		// Add data
		this.chart.data = [{
			"year": 2005,
			"income": 23.5,
			"expenses": 18.1
		}, {
			"year": 2006,
			"income": 26.2,
			"expenses": 22.8
		}, {
			"year": 2007,
			"income": 30.1,
			"expenses": 23.9
		}, {
			"year": 2008,
			"income": 29.5,
			"expenses": 25.1
		}, {
			"year": 2009,
			"income": 24.6,
			"expenses": 25
		}];

		// Create axes
		let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "year";
		categoryAxis.numberFormatter.numberFormat = "#";
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.cellStartLocation = 0.1;
		categoryAxis.renderer.cellEndLocation = 0.9;

		let valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.opposite = true;


		this.createSeries("income", "Income");
		this.createSeries("expenses", "Expenses");
	}

	// Create series
	createSeries(field: string, name: string) {
		let series = this.chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueX = field;
		series.dataFields.categoryY = "year";
		series.name = name;
		series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
		series.columns.template.height = am4core.percent(100);
		series.sequencedInterpolation = true;

		let valueLabel = series.bullets.push(new am4charts.LabelBullet());
		valueLabel.label.text = "{valueX}";
		valueLabel.label.horizontalCenter = "left";
		valueLabel.label.dx = 10;
		valueLabel.label.hideOversized = false;
		valueLabel.label.truncate = false;

		let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
		categoryLabel.label.text = "{name}";
		categoryLabel.label.horizontalCenter = "right";
		categoryLabel.label.dx = -10;
		categoryLabel.label.fill = am4core.color("#fff");
		categoryLabel.label.hideOversized = false;
		categoryLabel.label.truncate = false;
	}

}
