export interface ISellRequestsMy {
	page: number
	size: number
	filters:{
		bank?: string,
        status?: string,
        date?: string
	}
	filterField?: string
	filterValue?: number
}