import { Component } from "@angular/core";
import { ChartBase } from "../chart-base";

@Component({
	selector: "summary-bar-chart",
	templateUrl: "./summary-bar-chart.component.html"
})
export class SummaryBarChartComponent extends ChartBase {

	constructor() {
		super();
	}

	ngOnInit() { }

}
