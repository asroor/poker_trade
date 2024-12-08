import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export interface ISellRequests {
    pokerRoomId?: number
    currencyId?: number
    page: number
    size: number
    sortField: string
    sortDirection: string
    filterField?: string
    filterValue?: number
}

export interface ISellRequestsMy {
    page: number
    size: number
    filterField?: string
    filterValue?: number
}

export interface ISellRequestBody {
    pokerRoomId?: number
    currencyId?: number
    wantToSellUSD: number
    minToSellUSD: number
    currencyRate: number
    bankId: number
    detailsValue: string
    fullName: string
}

export interface IOrder {
    bankImageUrl: string
    bankName: string
    currencyRate: number
    id: number
    info: any
    minToSellUSD: number
    nickname: string
    wantToSellUSD: number
}

export interface IOrderMy {
    bankImageUrl: string
    createdAt: string
    currencyName: string
    currencyRate: number
    factSellerProfit: number
    factUSDSold: number
    id: number
    roomImageUrl: string
    status: string
}

export interface IBaseOrder {
    my: number[]
    other: IOrder[]
    total: number
}

export interface IOrderOne {
    adminProfitUSD: number
    bankName: string
    bill: string
    createdAt: string
    currencyName: string
    currencyRate: number
    detailsValue: string
    fullName: string
    minToSellUSD?: number
    pokerRoomName: string
    pokerRoomNickname: any
    received: number
    soldUSD: number
    status: string
    wantToSellUSD: number
}

export interface IOrderBuy {
    bankImageUrl: string
    createdAt: string
    currencyName: string
    currencyRate: number
    gave: number
    id: number
    received: number
    roomImageUrl: string
    sell_request_id: number
    status: string
    buyerFullName: any
    buyerLastFourDig: any
    wantToBuyUSD: number
}

export interface IOrderBuyOne {
    bankName: string
    createdAt: string
    currencyName: string
    currencyRate: number
    detailsValue: string
    isSbpBank: boolean
    pokerRoomName: string
    pokerRoomNickname: string
    sellRequestId: number
    sellerFullName: string
    sellerNickname: string
    status: string
    wantToBuyUSD: number
}



@Injectable({
    providedIn: 'root'
})
export class OrderService {
    _url = `${environment.apiUrl}`
    constructor(private _http: HttpClient) { }

    sellRequests(param: ISellRequests) {
        return this._http.post<IBaseOrder>(`${this._url}/sell-requests`, { ...param })
    }

    buyRequests(id: number) {
        return this._http.get<IOrderBuy[]>(`${this._url}/buy-requests/${id}`)
    }

    buyRequestsMy(param: ISellRequestsMy) {
        return this._http.post<{ result: IOrderBuy[], total: number }>(`${this._url}/buy-requests/my`, { ...param })
    }

    buyRequestsOne(id: number) {
        return this._http.get<IOrderBuyOne>(`${this._url}/buy-request/${id}`)
    }

    sellRequestsMy(param: ISellRequestsMy) {
        return this._http.post<{ result: IOrderMy[], total: number }>(`${this._url}/sell-requests/my`, { ...param })
    }

    sellRequest(param: ISellRequestBody) {
        return this._http.post<{ sellRequestId: number }>(`${this._url}/sell-request`, { ...param })
    }

    buyRequest(param: { sellRequestId: number, wantToBuyUSD: number, pokerRoomNickname: string }) {
        return this._http.post<{ buyRequestId: number }>(`${this._url}/buy-request`, { ...param })
    }

    sellRequestModeration(data: { sellRequestId: number, pokerRoomNickname: string }) {
        return this._http.post<string>(`${this._url}/sell-request/to-moderation`, { ...data })
    }

    sellRequestCancel(data: { sellRequestId: number }) {
        return this._http.post<string>(`${this._url}/sell-request/cancel`, data)
    }

    getSellRequest(id: number) {
        return this._http.get<IOrderOne>(`${this._url}/sell-request/${id}`)
    }

    buyRequestAccept(data: { buyRequestId: number }) {
        return this._http.post<any>(`${this._url}/buy-request/accept`, data)
    }

    buyRequestReject(data: { buyRequestId: number }) {
        return this._http.post<any>(`${this._url}/buy-request/reject`, data)
    }

    buyRequestReceiveApprove(data: { buyRequestId: number }) {
        return this._http.post<any>(`${this._url}/buy-request/receive-approve`, data)
    }

    buyRequestOpenDispute(data: { buyRequestId: number }) {
        return this._http.post<any>(`${this._url}/buy-request/open-dispute`, data)
    }

    buyRequestCancel(data: { buyRequestId: number }) {
        return this._http.post<any>(`${this._url}/buy-request/cancel`, data)
    }

    buyRequestPayed(data: { buyRequestId: number, bayerFullName: string, lastFourDig:string }) {
        return this._http.post<any>(`${this._url}/buy-request/i-payed`, data)
    }


    

}