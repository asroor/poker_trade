import { IOrder } from "./order"

export interface IBaseOrder {
	my: number[]
	other: IOrder[]
	total: number
}