import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
//import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ProvincesEnum } from "src/app/helpers/data.hepler";
import { ChartBase } from "../chart-base";
//am4core.useTheme(am4themes_animated);

@Component({
	selector: "summary-line-chart",
	templateUrl: "./summary-line-chart.component.html"
})
export class SummaryLineChartComponent extends ChartBase {
	
	constructor() { 
		super();
	}

	renderChart(data: any[], provincesSelected: ProvincesEnum[]) {
		this.chart = am4core.create("summary-line-chart", am4charts.XYChart);

		let categoryAxis: am4charts.CategoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "year";
		categoryAxis.renderer.minGridDistance = 50;
		categoryAxis.renderer.grid.template.location = 0.5;
		categoryAxis.startLocation = 0.5;
		categoryAxis.endLocation = 0.5;

		// Create value axis
		let valueAxisQuantities: am4charts.ValueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
		valueAxisQuantities.baseValue = 0;

		let valueAxisValues: am4charts.ValueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
		valueAxisQuantities.baseValue = 0;
		valueAxisValues.renderer.opposite = true;

		// Add scrollbar
		var scrollbarX = new am4charts.XYChartScrollbar();

		// Create series
		provincesSelected.forEach(p => {
			let seriesQuantities: am4charts.LineSeries = this.createSeries(p, "Quantities", "tonn", valueAxisQuantities);
			scrollbarX.series.push(seriesQuantities);
			let seriesValues: am4charts.LineSeries = this.createSeries(p, "Values", "thousand $", valueAxisValues);
			scrollbarX.series.push(seriesValues);
		});

		this.chart.scrollbarX = scrollbarX;

		this.chart.legend = new am4charts.Legend();
		this.chart.legend.position = "top";

		this.chart.cursor = new am4charts.XYCursor();

		this.chart.data = data;

		console.log(this.chart.data);
	}

	createSeries(province: ProvincesEnum, type: "Quantities" | "Values", units: string, valueAxis: am4charts.ValueAxis): am4charts.LineSeries {
		let series: am4charts.LineSeries = this.chart.series.push(new am4charts.LineSeries());
		series.dataFields.valueY = `${province} ${type}`;
		series.dataFields.categoryX = "year";
		series.strokeWidth = 2;
		series.name = `${province} (${units})`;
		series.yAxis = valueAxis;
		series.tooltipHTML = `<b>{name}: {valueY}</b>`;
		return series;
	}

}
