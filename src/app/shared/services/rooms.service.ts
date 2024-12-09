import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { IRoom } from "../../interface";



@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private _url = `${environment.apiUrl}`
    constructor(private _http: HttpClient) { }

    getRoom():Observable<IRoom[]> {
        return this._http.get<IRoom[]>(`${this._url}/poker-rooms`)
    }
}