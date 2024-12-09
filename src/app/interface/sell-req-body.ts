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