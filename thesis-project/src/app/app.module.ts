import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DataService } from "./services/data.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";


//KENDO MODULES
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { SummaryLineChartComponent } from "./components/charts/summary-line-chart/summary-line-chart.component";
import { InputsModule } from "@progress/kendo-angular-inputs";

@NgModule({
	declarations: [
		AppComponent,
		MainPageComponent,
		SummaryLineChartComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		//KENDO MODULES
		ButtonsModule,
		DropDownsModule,
		LabelModule,
		InputsModule
	],
	providers: [HttpClient, DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
