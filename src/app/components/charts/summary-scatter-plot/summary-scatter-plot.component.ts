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

	renderChart(data: any[], fishTypes: string[]) {
		this.chart = am4core.create("summary-scatter-plot", am4charts.XYChart);

		// Add data
		this.chart.data = data;

		// Create value axes
		let valueAxisX = this.chart.xAxes.push(new am4charts.ValueAxis());
		valueAxisX.title.text = 'Value (thousand $)';
		valueAxisX.renderer.minGridDistance = 40;

		valueAxisX.renderer.labels.template.rotation = -45;
		valueAxisX.renderer.labels.template.horizontalCenter = "right";
		valueAxisX.renderer.labels.template.verticalCenter = "middle";

		// Create value axis
		let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
		valueAxisY.title.text = 'Quantity (tonn)';
		valueAxisY.renderer.minGridDistance = 40;

		fishTypes.forEach(f => this.createSeries(f));

		//scrollbars
		this.chart.scrollbarX = new am4core.Scrollbar();
		this.chart.scrollbarY = new am4core.Scrollbar();

		this.chart.legend = new am4charts.Legend();
		this.chart.legend.position = "top";

		this.chart.cursor = new am4charts.XYCursor();

		this.chart.numberFormatter.numberFormat = "#";
	}

	createSeries(fishType: string) {
		// Create series
		let lineSeries = this.chart.series.push(new am4charts.LineSeries());
		lineSeries.dataFields.valueX = `${fishType} Value`;
		lineSeries.dataFields.valueY = `${fishType} Quantity`;
		lineSeries.name = fishType;
		//lineSeries.strokeOpacity = 0;

		// Add a bullet
		let bullet = lineSeries.bullets.push(new am4charts.LabelBullet());
		bullet.label.text = "{year}";
		bullet.label.fontSize = 10;
		bullet.label.dy = -10;

		// Add a triangle to act as am arrow
		let arrow = bullet.createChild(am4core.Triangle);
		arrow.horizontalCenter = "middle";
		arrow.verticalCenter = "middle";
		arrow.rotation = 180;
		arrow.strokeWidth = 0;
		arrow.direction = "top";
		arrow.width = 12;
		arrow.height = 12;
	}

}
