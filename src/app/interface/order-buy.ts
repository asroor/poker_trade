import { IChat } from "./chat"

export interface IOrderBuy {
	autoCancelAfterSec: number,
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
	chats: IChat[]
}