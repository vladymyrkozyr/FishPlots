import { Component } from "@angular/core";
import { ChartBase } from "../chart-base";

@Component({
	selector: "summary-pie-chart",
	templateUrl: "./summary-pie-chart.component.html"
})
export class SummaryPieChartComponent extends ChartBase {

	constructor() {
		super();
	}

	ngOnInit() { }

}
