import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export interface IBank {
    id: number
    imageUrl: string
    isSbp: boolean
    sbpBanksUrl: string
    title: string
}


@Injectable({
    providedIn: 'root'
})
export class BankService {
    _url = `${environment.apiUrl}`
    constructor(private _http: HttpClient) { }

    getBank(currencyId: number) {
        return this._http.get<IBank[]>(`${this._url}/banks/${currencyId}`)
    }

    getExistingBanks(roomId: number, currencyId: number) {
        return this._http.get<IBank[]>(`${this._url}/existing-banks/${roomId}/${currencyId}`)
    }
}