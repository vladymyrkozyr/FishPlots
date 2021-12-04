import { Component, OnDestroy } from "@angular/core";

import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
    template: ''
})

export class ChartBase implements OnDestroy {

    chart: am4charts.XYChart | am4charts.PieChart | any;

    constructor() { }

    ngOnDestroy() {
        this.chart?.dispose();
    }
}