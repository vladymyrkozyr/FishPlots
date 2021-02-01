import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { forkJoin } from "rxjs";
import { DataHelper, ProvincesEnum } from "src/app/helpers/data.hepler";
import { SummaryLineChartComponent } from "../charts/summary-line-chart/summary-line-chart.component";
import { SummaryScatterPlotComponent } from "../charts/summary-scatter-plot/summary-scatter-plot.component";
import { SummaryBarChartComponent } from "../charts/summary-bar-chart/summary-bar-chart.component";

@Component({
	selector: "main-page",
	templateUrl: "./main-page.component.html",
	styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {

	startYear: number = DataHelper.startYear;
	endYear: number = DataHelper.endYear;

	fishTypes: string[] = DataHelper.fishTypes;
	provinces: ProvincesEnum[] = DataHelper.provinces;
	years: string[] = DataHelper.years;

	fishTypesSelected: string[] = DataHelper.fishTypes;
	provincesSelected: ProvincesEnum[] = DataHelper.provinces;
	yearsRange: [number, number] = [this.startYear, this.endYear];

	isFishTypeSelected = (item: string): boolean => {
		return this.fishTypesSelected.some(fishType => fishType == item);
	}

	onFishTypesChange(event: string) {
		console.log(event);
	}

	isProvinceSelected = (item: string): boolean => {
		return this.provincesSelected.some(province => province == item);
	}

	onProvincesChange(event: string) {
		console.log(event);
	}

	dataQuantities = {};
	dataValues = {};

	summaryLineChartData: any[];

	@ViewChild("summaryLineChart") summaryLineChart: SummaryLineChartComponent;
	@ViewChild("summaryScatterPlot") summaryScatterPlot: SummaryScatterPlotComponent;
	@ViewChild("summaryBarChart") summaryBarChart: SummaryBarChartComponent;


	constructor(
		private dataService: DataService
	) { }

	ngOnInit() { }

	getData() {

		let fileRequestsQuantities = [];
		let fileRequestsValues = [];

		for (let i: number = this.startYear; i <= this.endYear; i++) {
			fileRequestsQuantities.push(this.dataService.getFileByUrl(`assets/files/json/sea fish quantities/s${i}pq_e.json`));
			fileRequestsValues.push(this.dataService.getFileByUrl(`assets/files/json/sea fish values/s${i}pv_e.json`));
		}

		forkJoin([...fileRequestsQuantities, ...fileRequestsValues]).subscribe((files: any[]) => {

			console.log(files)
			console.log(DataHelper.yearsAmount)

			for (let i: number = 0; i <= DataHelper.yearsAmount; i++) {

				this.dataQuantities[i + this.startYear] = files[i].map(fq => {
					let q: any = {};
					q.fishType = fq["Species"];
					q[ProvincesEnum.NovaScotia] = this.parseStringValue(fq[ProvincesEnum.NovaScotia]);
					q[ProvincesEnum.NewBrunswick] = this.parseStringValue(fq[ProvincesEnum.NewBrunswick]);
					q[ProvincesEnum.PrinceEdwardIsland] = this.parseStringValue(fq[ProvincesEnum.PrinceEdwardIsland]);
					q[ProvincesEnum.Quebec] = this.parseStringValue(fq[ProvincesEnum.Quebec]);
					q[ProvincesEnum.NewfoundlandAndLabrador] = this.parseStringValue(fq[ProvincesEnum.NewfoundlandAndLabrador]);
					q[ProvincesEnum.BritishColumbia] = this.parseStringValue(fq[ProvincesEnum.BritishColumbia]);
					return q;
				});

				this.dataValues[i + this.startYear] = files[i + DataHelper.yearsAmount + 1].map(fv => {
					let v: any = {};
					v.fishType = fv["Species"];
					v[ProvincesEnum.NovaScotia] = this.parseStringValue(fv[ProvincesEnum.NovaScotia]);
					v[ProvincesEnum.NewBrunswick] = this.parseStringValue(fv[ProvincesEnum.NewBrunswick]);
					v[ProvincesEnum.PrinceEdwardIsland] = this.parseStringValue(fv[ProvincesEnum.PrinceEdwardIsland]);
					v[ProvincesEnum.Quebec] = this.parseStringValue(fv[ProvincesEnum.Quebec]);
					v[ProvincesEnum.NewfoundlandAndLabrador] = this.parseStringValue(fv[ProvincesEnum.NewfoundlandAndLabrador]);
					v[ProvincesEnum.BritishColumbia] = this.parseStringValue(fv[ProvincesEnum.BritishColumbia]);
					return v;
				});
			}

			console.log(this.dataQuantities);
			console.log(this.dataValues);

			this.renderSummaryLineChart();
			this.renderScatterPlot();
			this.renderSummaryBarChart();
		});
	}

	parseStringValue(value: any): number {
		return DataHelper.parseStringValue(value);
	}

	renderSummaryLineChart() {
		this.summaryLineChartData = [];
		for (let i: number = this.yearsRange[0]; i <= this.yearsRange[1]; i++) {
			let d: any = {};
			d.year = i.toString();
			this.provincesSelected.forEach(p => {
				d[`${p} Quantities`] = this.dataQuantities[i].filter(d => this.fishTypesSelected.includes(d.fishType)).reduce((sum, current) => sum + current[p], 0);
				d[`${p} Values`] = this.dataValues[i].filter(d => this.fishTypesSelected.includes(d.fishType)).reduce((sum, current) => sum + current[p], 0);
			});

			this.summaryLineChartData.push(d);
		}
		this.summaryLineChart.renderChart(this.summaryLineChartData, this.provincesSelected);
	}

	renderScatterPlot() {
		this.summaryScatterPlot.renderChart();
	}

	renderSummaryBarChart() {
		this.summaryBarChart.renderChart();
	}

}
