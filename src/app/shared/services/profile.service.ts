import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export interface IProfile {
    balance: number
    email: any
    nickname: string
    retryAfterSec: any
    verified: boolean
}


@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    _url = `${environment.apiUrl}`
    constructor(private _http: HttpClient) { }

    getProfile() {
        return this._http.get<IProfile>(`${this._url}/user`)
    }
}