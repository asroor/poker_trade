import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export interface IRoom {
    id: number
    imageUrl: string
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private _url = `${environment.apiUrl}`
    constructor(private _http: HttpClient) { }

    getRoom() {
        return this._http.get<IRoom[]>(`${this._url}/poker-rooms`)
    }
}