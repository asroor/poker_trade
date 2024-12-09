import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { IProfile } from "../../interface";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	_url = `${environment.apiUrl}`
	constructor(private _http: HttpClient) { }

	getProfile(): Observable<IProfile> {
		return this._http.get<IProfile>(`${this._url}/user`)
	}

    isUserLoginned() {
		return localStorage.getItem('telegramToken') != null
	}
}