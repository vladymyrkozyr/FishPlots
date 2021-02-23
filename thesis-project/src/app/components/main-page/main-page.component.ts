import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { forkJoin } from "rxjs";
import { DataHelper, ProvincesEnum } from "src/app/helpers/data.hepler";
import { SummaryLineChartComponent } from "../charts/summary-line-chart/summary-line-chart.component";
import { SummaryScatterPlotComponent } from "../charts/summary-scatter-plot/summary-scatter-plot.component";
import { SummaryBarChartComponent } from "../charts/summary-bar-chart/summary-bar-chart.component";
import { SummaryPieChartComponent } from "../charts/summary-pie-chart/summary-pie-chart.component";

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

	fishTypesSelected: string[] = DataHelper.fishTypesDefaultSelection;
	provincesSelected: ProvincesEnum[] = DataHelper.provincesDefaultSelection;
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

	dataQuantities: any = {};
	dataValues: any = {};

	summaryLineChartData: any[] = [];
	summaryScatterPlotData: any[] = [];
	summaryPieChartData: any = {};
	summaryBarChartData: any[] = [];

	@ViewChild("summaryLineChart") summaryLineChart: SummaryLineChartComponent;
	@ViewChild("summaryScatterPlot") summaryScatterPlot: SummaryScatterPlotComponent;
	@ViewChild("summaryBarChart") summaryBarChart: SummaryBarChartComponent;
	@ViewChild("summaryPieChart") summaryPieChart: SummaryPieChartComponent;


	constructor(
		private dataService: DataService
	) { }

	ngOnInit() { }

	getData() {

		let fileRequestsQuantities: any[] = [];
		let fileRequestsValues: any[] = [];

		for (let i: number = this.startYear; i <= this.endYear; i++) {
			fileRequestsQuantities.push(this.dataService.getFileByUrl(`assets/files/json/sea fish quantities/s${i}pq_e.json`));
			fileRequestsValues.push(this.dataService.getFileByUrl(`assets/files/json/sea fish values/s${i}pv_e.json`));
		}

		forkJoin([...fileRequestsQuantities, ...fileRequestsValues]).subscribe((files: any[]) => {

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

			this.renderSummaryLineChart();
			this.renderScatterPlot();
			this.renderSummaryBarChart();
			this.renderPieChart();
		});
	}

	parseStringValue(value: any): number {
		return DataHelper.parseStringValue(value);
	}

	getQuantitiesAndValuesSummarizedByFishTypeForYear(y: number): any {
		let year: string = y.toString();
		
		let q: any[] = this.dataQuantities[year];
		let v: any[] = this.dataValues[year];

		q = q.filter(d => this.fishTypesSelected.includes(d.fishType));
		v = v.filter(d => this.fishTypesSelected.includes(d.fishType));

		let quantities: any[] = [];
		q.forEach(d => {
			let sum: number = 0;
			this.provincesSelected.forEach(p => sum += d[p]);
			quantities.push({ fishType: d.fishType, quantity: sum });
		});

		let values: any[] = [];
		v.forEach(d => {
			let sum: number = 0;
			this.provincesSelected.forEach(p => sum += d[p]);
			values.push({ fishType: d.fishType, value: sum });
		});

		return { quantities: quantities, values: values };
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
		// for (let i: number = this.yearsRange[0]; i <= this.yearsRange[1]; i++) {
		// 	let d: any = {};
		// 	d.year = i.toString();
		// 	console.log(this.dataQuantities[i])
		// 	this.fishTypesSelected.forEach(f => {
		// 		let q: any = {};
		// 		this.provincesSelected.forEach(p => {
		// 			q[`${p} Quantities`]
		// 		});
		// 		d[`${f} Quantities`] = this.dataQuantities[i].filter(d => this.fishTypesSelected.includes(d.fishType)).reduce((sum, current) => sum + current[f], 0);
		// 		d[`${f} Values`] = this.dataValues[i].filter(d => this.provincesSelected.includes(d.fishType)).reduce((sum, current) => sum + current[f], 0);
		// 	});

		// 	this.summaryScatterPlotData.push(d);
		// }

		// console.log(this.summaryLineChartData);
		this.summaryScatterPlot.renderChart();
	}

	renderSummaryBarChart() {
		this.summaryBarChartData = [
			{ year: this.yearsRange[0], ...this.getQuantitiesAndValuesSummarizedByFishTypeForYear(this.yearsRange[0]) },
			{ year: this.yearsRange[1], ...this.getQuantitiesAndValuesSummarizedByFishTypeForYear(this.yearsRange[1]) }
		];

		this.summaryBarChart.renderChart(this.summaryBarChartData, this.fishTypesSelected);
	}

	renderPieChart() {
		this.summaryPieChartData = this.getQuantitiesAndValuesSummarizedByFishTypeForYear(this.yearsRange[1]);
		this.summaryPieChart.renderChart(this.summaryPieChartData, this.yearsRange[1].toString());
	}

}
