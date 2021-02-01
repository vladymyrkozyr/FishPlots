import { Component, OnInit } from "@angular/core";
import { ChartBase } from "../chart-base";

@Component({
	selector: "summary-scatter-plot",
	templateUrl: "./summary-scatter-plot.component.html",
})
export class SummaryScatterPlotComponent extends ChartBase {
	
	constructor() { 
		super();
	}
	
}
