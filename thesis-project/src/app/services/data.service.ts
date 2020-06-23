import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
	providedIn: "root"
})
export class DataService {

	constructor(private http: HttpClient){}

	getTestFile(): Observable<any> {
		return this.http.get("assets/files/s1990pq_e.json", { responseType: "json" });
	}
}
