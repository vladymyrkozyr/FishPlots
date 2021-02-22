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

	chart1: am4charts.XYChart;
	chart2: am4charts.XYChart;

	renderChart(data: any[], fishTypes: string[]) {
		this.renderChart1(data[0], fishTypes);
		this.renderChart2(data[1], fishTypes);
	}

	renderChart1(data: any, fishTypes: string[]) {
		// Create chart instance
		this.chart1 = am4core.create("summary-bar-chart-1", am4charts.XYChart);
		
		let dataParsed = [];
		fishTypes.forEach(f => {
			dataParsed.push({
				fishType: f,
				quantity: -data.quantities?.find(e => e.fishType == f)?.quantity,
				value: data.values?.find(e => e.fishType == f)?.value,
			})
		});

		 // Add data
		this.chart1.data = dataParsed;
		console.log(dataParsed)

		let title = this.chart1.titles.push(new am4core.Label());
		title.text = data.year;
		title.fontSize = 25;
		title.marginBottom = 15;

		// Create axes
		let categoryAxis = this.chart1.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "fishType";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.minGridDistance = 20;
		categoryAxis.renderer.axisFills.template.disabled = false;
		categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;

		let valueAxis = this.chart1.xAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.minGridDistance = 50;
		valueAxis.renderer.ticks.template.length = 5;
		valueAxis.renderer.ticks.template.disabled = false;
		valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
		
		// Legend
		this.chart1.legend = new am4charts.Legend();
		this.chart1.legend.position = "top";

		// Use only absolute numbers
		this.chart1.numberFormatter.numberFormat = "#.#s";

		// Create series

		this.createSeries("quantity", "Quantity (tonn)", "tonn", this.chart1);
		this.createSeries("value", "Value (thousand $)", "thousand $", this.chart1);
	}

	renderChart2(data: any, fishTypes: string[]) {
		// Create chart instance
		this.chart2 = am4core.create("summary-bar-chart-2", am4charts.XYChart);
		
		let dataParsed = [];
		fishTypes.forEach(f => {
			dataParsed.push({
				fishType: f,
				quantity: -data.quantities?.find(e => e.fishType == f)?.quantity,
				value: data.values?.find(e => e.fishType == f)?.value
			})
		});

		 // Add data
		this.chart2.data = dataParsed;

		let title = this.chart2.titles.push(new am4core.Label());
		title.text = data.year;
		title.fontSize = 25;
		title.marginBottom = 15;

		// Create axes
		let categoryAxis = this.chart2.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "fishType";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.minGridDistance = 20;
		categoryAxis.renderer.axisFills.template.disabled = false;
		categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;

		let valueAxis = this.chart2.xAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.minGridDistance = 50;
		valueAxis.renderer.ticks.template.length = 5;
		valueAxis.renderer.ticks.template.disabled = false;
		valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
		
		// Legend
		this.chart2.legend = new am4charts.Legend();
		this.chart2.legend.position = "top";

		// Use only absolute numbers
		this.chart2.numberFormatter.numberFormat = "#.#s";

		// Create series

		this.createSeries("quantity", "Quantity (tonn)", "tonn", this.chart2);
		this.createSeries("value", "Value (thousand $)", "thousand $", this.chart2);
	}

	createSeries(field: string, name: string, units: string, chart:am4charts.XYChart) {
		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueX = field;
		series.dataFields.categoryY = "fishType";
		series.stacked = true;
		series.name = name;
		series.columns.template.tooltipText = `[bold]{valueX} (${units})[/]`;

		let label = series.bullets.push(new am4charts.LabelBullet);
		label.label.text = `{valueX}`;
		label.label.fill = am4core.color("#fff");
		label.label.strokeWidth = 0;
		label.label.truncate = false;
		label.label.hideOversized = true;
		label.locationX = 0.5;
		return series;
	}

	ngOnDestroy() {
		this.chart1?.dispose();
		this.chart2?.dispose();
	}



		// let dataParsed: any[] = [];
		// data.forEach(d => {
		// 	let dataItem: any = {};
		// 	dataItem.year = d.year;
		// 	fishTypes.forEach(f => {
		// 		dataItem[`${f} Quantities`] = -d.quantities?.find(e => e.fishType == f)?.quantity;
		// 		dataItem[`${f} Values`] = d.values?.find(e => e.fishType == f)?.value;
		// 	});
		// 	dataParsed.push(dataItem);
		// });

}
