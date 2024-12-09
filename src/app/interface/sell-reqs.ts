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
