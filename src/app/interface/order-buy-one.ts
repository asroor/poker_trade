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
	autoCancelAfterSec: number
	wantToBuyUSD: number
}