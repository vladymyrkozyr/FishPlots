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

	renderChart(data: any[], fishTypes: string[]) {
		// Create chart instance
		this.chart = am4core.create("summary-bar-chart", am4charts.XYChart);

		console.log(data);

		let dataParsed: any[] = [];
		data.forEach(d => {
			let dataItem: any = {};
			dataItem.year = d.year;
			fishTypes.forEach(f => {
				dataItem[`${f} Quantities`] = d.quantities?.find(e => e.fishType == f)?.quantity;
				dataItem[`${f} Values`] = d.values?.find(e => e.fishType == f)?.value;
			});
			dataParsed.push(dataItem);
		});

		console.log(dataParsed)

		// Add data
		this.chart.data = dataParsed;

		// Create axes
		let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "year";
		categoryAxis.numberFormatter.numberFormat = "#";
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.cellStartLocation = 0.1;
		categoryAxis.renderer.cellEndLocation = 0.9;

		let valueAxisQuantities: am4charts.ValueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
		valueAxisQuantities.renderer.opposite = true;

		let valueAxisValues = this.chart.xAxes.push(new am4charts.ValueAxis());

		fishTypes.forEach(f => { 
			this.createSeries(f, "Quantities", "tonn", valueAxisQuantities);
			this.createSeries(f, "Values", "thousand $", valueAxisValues);
		});

	}

	// Create series
	createSeries(field: string, type: "Quantities" | "Values", units: string, valueAxis: am4charts.ValueAxis) {
		let series = this.chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueX = `${field} ${type}`;
		series.dataFields.categoryY = "year";
		series.xAxis = valueAxis;
		series.name = field;
		series.columns.template.tooltipText = `{name}: [bold]{valueX} (${units})[/]`;
		//series.columns.template.height = am4core.percent(100);
		series.sequencedInterpolation = true;

		let valueLabel = series.bullets.push(new am4charts.LabelBullet());
		valueLabel.label.text = `{name}: {valueX} (${units})`;
		valueLabel.label.horizontalCenter = "left";
		valueLabel.label.dx = 10;
		valueLabel.label.hideOversized = false;
		valueLabel.label.truncate = false;
	}

}
