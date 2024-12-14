import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { ISellRequestBody, IBaseOrder, IOrderBuy, IOrderBuyOne, IOrderMy, IOrderOne, ISellRequests, ISellRequestsMy, IOrder } from "../../interface";
import { MessageService } from "primeng/api";
import { IChat } from "../../interface/chat";


@Injectable({
	providedIn: 'root'
})
export class OrderService {
	_url = `${environment.apiUrl}`
	constructor(private _http: HttpClient,private msg: MessageService) { }

	/**
	 * 
	 * @param param 
	 * @returns 
	 */
	sellRequests(param: ISellRequests): Observable<IBaseOrder> {
		return this._http.post<IBaseOrder>(`${this._url}/sell-requests`, { ...param }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	buyRequests(id: number): Observable<IOrderBuy[]> {
		return this._http.get<IOrderBuy[]>(`${this._url}/buy-requests/${id}`).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param param 
	 * @returns 
	 */
	buyRequestsMy(param: ISellRequestsMy): Observable<{ result: IOrderBuy[], total: number }> {
		return this._http.post<{ result: IOrderBuy[], total: number }>(`${this._url}/buy-requests/my`, { ...param }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	buyRequestsOne(id: number): Observable<IOrderBuyOne> {
		return this._http.get<IOrderBuyOne>(`${this._url}/buy-request/${id}`).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param param 
	 * @returns 
	 */
	sellRequestsMy(param: ISellRequestsMy): Observable<{ result: IOrderMy[], total: number }> {
		return this._http.post<{ result: IOrderMy[], total: number }>(`${this._url}/sell-requests/my`, { ...param }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param param 
	 * @returns 
	 */
	sellRequest(param: ISellRequestBody): Observable<{ sellRequestId: number }> {
		return this._http.post<{ sellRequestId: number }>(`${this._url}/sell-request`, { ...param }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param param 
	 * @returns 
	 */
	buyRequest(param: { sellRequestId: number, wantToBuyUSD: number, pokerRoomNickname: string }): Observable<{ buyRequestId: number }> {
		return this._http.post<{ buyRequestId: number }>(`${this._url}/buy-request`, { ...param }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	sellRequestModeration(data: { sellRequestId: number, pokerRoomNickname: string }): Observable<string> {
		return this._http.post<string>(`${this._url}/sell-request/to-moderation`, { ...data }).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	sellRequestCancel(data: { sellRequestId: number }): Observable<string> {
		return this._http.post<string>(`${this._url}/sell-request/cancel`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	getSellRequestShared(id: number): Observable<IOrder> {
		return this._http.get<IOrder>(`${this._url}/sell-request/shared/${id}`).pipe(
			catchError(this.handleError)
		)
	}

    getSellRequest(id: number): Observable<IOrderOne> {
		return this._http.get<IOrderOne>(`${this._url}/sell-request/${id}`).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestAccept(data: { buyRequestId: number }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/accept`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestReject(data: { buyRequestId: number }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/reject`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestReceiveApprove(data: { buyRequestId: number }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/receive-approve`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestOpenDispute(data: { buyRequestId: number }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/open-dispute`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestCancel(data: { buyRequestId: number }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/cancel`, data).pipe(
			catchError(this.handleError)
		)
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 */
	buyRequestPayed(data: { buyRequestId: number, bayerFullName: string, lastFourDig: string }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/i-payed`, data).pipe(
			catchError(this.handleError)
		)
	}


	/**
	 * 
	 * @param err 
	 * @returns 
	 */
	private handleError(err: HttpErrorResponse): Observable<never> {
		let errMsg = 'Произошла неизвестная ошибка';
		// if (err instanceof ErrorEvent) {
		// 	errMsg = `Ошибка: ${err}`;
        //     this.msg.add({ severity: 'error', summary: `Статус ошибки: ${err}`, detail: err });
		// } else {
		// 	errMsg = `Ошибка: ${err.message}, Статус ошибки: ${err.status}`;
        //     this.msg.add({ severity: 'error', summary: `Статус ошибки: ${err.status}`, detail: err.error });
            
		// }
		return throwError(() => err);
	}

	buyRequestChatText(data: { buyRequestId: number, message: string }): Observable<any> {
		return this._http.post<any>(`${this._url}/buy-request/chat/text`, data).pipe(
			catchError(this.handleError)
		)
	}

	buyRequestChatFile(data: { buyRequestId: number, file: any }): Observable<any> {
		const formData = new FormData();
		formData.append('buy_request_id', data.buyRequestId.toString()); // ID ni stringga o'girish
		formData.append('file', data.file); // Faylni qo'shish

		return this._http.post<any>(`${this._url}/buy-request/chat/file`, formData).pipe(
			catchError(this.handleError)
		);
	}

	getBuyRequestChat(buyRequestId: number): Observable<any> {
		return this._http.get<IChat[]>(`${this._url}/buy-request/chat/${buyRequestId}`).pipe(
			catchError(this.handleError)
		);
	}




}