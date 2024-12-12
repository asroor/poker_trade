import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { IBank } from "../../interface";

@Injectable({
	providedIn: 'root'
})
export class BankService {
	_url = `${environment.apiUrl}`
	constructor(private _http: HttpClient) { }

	getBank(currencyId: number): Observable<IBank[]> {
		return this._http.get<IBank[]>(`${this._url}/banks/${currencyId}`).pipe(
			catchError(this.handleError)
		)
	}

	getExistingBank(roomId:number, currencyId: number): Observable<IBank[]> {
		return this._http.get<IBank[]>(`${this._url}/existing-banks/${roomId}/${currencyId}`).pipe(
			catchError(this.handleError)
		)
	}

	getBankSbp(): Observable<string[]> {
		return this._http.get<string[]>(`${this._url}/sbp`).pipe(
			catchError(this.handleError)
		)
	}

	

	getExistingBanks(roomId: number, currencyId: number) {
		return this._http.get<IBank[]>(`${this._url}/existing-banks/${roomId}/${currencyId}`).pipe(
			catchError(this.handleError)
		)
	}

	private handleError(err: HttpErrorResponse): Observable<never> {
		let errMsg = 'Произошла неизвестная ошибка';
		if (err instanceof ErrorEvent) {
			errMsg = `Ошибка: ${err}`;
		} else {
			errMsg = `Ошибка: ${err.message}, Статус ошибки: ${err.status}`;
		}
		return throwError(() => new Error(errMsg));
	}
}