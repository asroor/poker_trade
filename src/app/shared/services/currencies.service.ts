import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

export interface ICurrency {
	id: number
	rateMax: number
	rateMin: number
	title: string
}


@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	_url = `${environment.apiUrl}`
	constructor(private _http: HttpClient) { }

	getCurrency(roomId: number): Observable<ICurrency[]> {
		return this._http.get<ICurrency[]>(`${this._url}/currencies/${roomId}`)
	}
}