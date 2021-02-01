import { Component } from "@angular/core";
import { ChartBase } from "../chart-base";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
	selector: "summary-scatter-plot",
	templateUrl: "./summary-scatter-plot.component.html",
})
export class SummaryScatterPlotComponent extends ChartBase {

	constructor() {
		super();
	}

	renderChart() {
		this.chart = am4core.create("summary-scatter-plot", am4charts.XYChart);

		// Add data
		this.chart.data = [{
			"ax": 1,
			"ay": 0.5,
			"bx": 1,
			"by": 2.2
		}, {
			"ax": 2,
			"ay": 1.3,
			"bx": 2,
			"by": 4.9
		}, {
			"ax": 3,
			"ay": 2.3,
			"bx": 3,
			"by": 5.1
		}, {
			"ax": 4,
			"ay": 2.8,
			"bx": 4,
			"by": 5.3
		}, {
			"ax": 5,
			"ay": 3.5,
			"bx": 5,
			"by": 6.1
		}, {
			"ax": 6,
			"ay": 5.1,
			"bx": 6,
			"by": 8.3
		}, {
			"ax": 7,
			"ay": 6.7,
			"bx": 7,
			"by": 10.5
		}, {
			"ax": 8,
			"ay": 8,
			"bx": 8,
			"by": 12.3
		}, {
			"ax": 9,
			"ay": 8.9,
			"bx": 9,
			"by": 14.5
		}, {
			"ax": 10,
			"ay": 9.7,
			"bx": 10,
			"by": 15
		}, {
			"ax": 11,
			"ay": 10.4,
			"bx": 11,
			"by": 18.8
		}, {
			"ax": 12,
			"ay": 11.7,
			"bx": 12,
			"by": 19
		}];

		// Create axes
		let valueAxisX = this.chart.xAxes.push(new am4charts.ValueAxis());
		valueAxisX.title.text = 'X Axis';
		valueAxisX.renderer.minGridDistance = 40;

		// Create value axis
		let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
		valueAxisY.title.text = 'Y Axis';

		// Create series
		let lineSeries = this.chart.series.push(new am4charts.LineSeries());
		lineSeries.dataFields.valueY = "ay";
		lineSeries.dataFields.valueX = "ax";
		lineSeries.strokeOpacity = 0;

		let lineSeries2 = this.chart.series.push(new am4charts.LineSeries());
		lineSeries2.dataFields.valueY = "by";
		lineSeries2.dataFields.valueX = "bx";
		lineSeries2.strokeOpacity = 0;

		// Add a bullet
		let bullet = lineSeries.bullets.push(new am4charts.Bullet());

		// Add a triangle to act as am arrow
		let arrow = bullet.createChild(am4core.Triangle);
		arrow.horizontalCenter = "middle";
		arrow.verticalCenter = "middle";
		arrow.strokeWidth = 0;
		arrow.fill = this.chart.colors.getIndex(0);
		arrow.direction = "top";
		arrow.width = 12;
		arrow.height = 12;

		// Add a bullet
		let bullet2 = lineSeries2.bullets.push(new am4charts.LabelBullet());
		bullet2.label.text = "{by}";
		bullet2.label.fontSize = 20;
		bullet2.label.dy = -30;
		

		// Add a triangle to act as am arrow
		let arrow2 = bullet2.createChild(am4core.Triangle);
		arrow2.horizontalCenter = "middle";
		arrow2.verticalCenter = "middle";
		arrow2.rotation = 180;
		arrow2.strokeWidth = 0;
		arrow2.fill = this.chart.colors.getIndex(3);
		arrow2.direction = "top";
		arrow2.width = 12;
		arrow2.height = 12;

		//add the trendlines
		let trend = this.chart.series.push(new am4charts.LineSeries());
		trend.dataFields.valueY = "value2";
		trend.dataFields.valueX = "value";
		trend.strokeWidth = 2
		trend.stroke = this.chart.colors.getIndex(0);
		trend.strokeOpacity = 0.7;
		trend.data = [
			{ "value": 1, "value2": 2 },
			{ "value": 12, "value2": 11 }
		];

		let trend2 = this.chart.series.push(new am4charts.LineSeries());
		trend2.dataFields.valueY = "value2";
		trend2.dataFields.valueX = "value";
		trend2.strokeWidth = 2
		trend2.stroke = this.chart.colors.getIndex(3);
		trend2.strokeOpacity = 0.7;
		trend2.data = [
			{ "value": 1, "value2": 1 },
			{ "value": 12, "value2": 19 }
		];

		

		//scrollbars
		this.chart.scrollbarX = new am4core.Scrollbar();
		this.chart.scrollbarY = new am4core.Scrollbar();
	}

}
