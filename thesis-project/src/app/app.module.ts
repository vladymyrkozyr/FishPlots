import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//KENDO MODULES
import { ButtonsModule } from "@progress/kendo-angular-buttons";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		//KENDO MODULES
		ButtonsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
