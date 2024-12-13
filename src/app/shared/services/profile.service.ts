import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { IProfile } from "../../interface";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  _url = `${environment.apiUrl}`;
  constructor(private _http: HttpClient) {}
  /**
   *
   * @param amount
   * @param pokerRoomNickname
   * @returns
   */
  withdrawingBalance(
    amount: number,
    pokerRoomNickname: string
  ): Observable<{
    amount: number;
    pokerRoomNickname: string;
  }> {
    return this._http
      .post<{
        amount: number;
        pokerRoomNickname: string;
      }>(`${environment.apiUrl}/balance-withdrawal`, {
        amount,
        pokerRoomNickname,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns
   */
  getProfile(): Observable<IProfile> {
    return this._http
      .get<IProfile>(`${this._url}/user`)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @returns
   */
  isUserLoginned() {
    return localStorage.getItem("telegramToken") != null;
  }

  /**
   *
   * @param email
   * @returns
   */
  sendCodeEmail(email: string): Observable<{ email: string }> {
    return this._http.post<{ email: string }>(
      `${environment.apiUrl}/user/email/sent`,
      { email }
    );
  }

  /**
   *
   * @param code
   * @returns
   */
  emailVerify(code: string): Observable<{ code: string }> {
    return this._http
      .post<{ code: string }>(`${environment.apiUrl}/user/email/verify`, {
        code,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param err
   * @returns
   */
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
