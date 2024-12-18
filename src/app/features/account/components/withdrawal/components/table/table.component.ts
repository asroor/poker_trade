import { Component } from "@angular/core";
import { BankService, OrderService } from "../../../../../../shared";
import { environment } from "../../../../../../../environments/environment";
import {
	IBank,
	IOrderMy,
	ISellRequestsMy,
	IStatus,
} from "../../../../../../interface";
import { DatePipe } from "@angular/common";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrl: "./table.component.scss",
})
export class TableComponent {
	mediaUrl = environment.mediaUrl;
	orders!: IOrderMy[];
	orderParam: ISellRequestsMy = { page: 0, size: 10, filters: {} };

	bankFilter!: IBank;
	statusFilter!: IStatus;
	dateFilter!: Date;

	tablePagination = { totalData: 1, size: 10 };
	loadData: boolean = false;
	loading: boolean = true;

	status: IStatus[];
	selectBank: undefined;
	selectStatus: IStatus | undefined;
	bankData!: IBank[];
	isPagination!: boolean
	constructor(
		private _orderService: OrderService,
		private _bankService: BankService,
		private datePipe: DatePipe
	) {
		this.status = [
			{
				name: "Новое",
				code: "NEW",
				icon: "pi pi-clock",
				severity: "info",
				filter: true,
			}, // NEW
			{
				name: "Модерация",
				code: "MODERATION",
				icon: "pi pi-search",
				severity: "warning",
				filter: true,
			}, // MODERATION
			{
				name: "В процессе",
				code: "IN_PROGRESS",
				icon: "pi pi-spinner pi-spin",
				severity: "info",
				filter: true,
			}, // IN_PROGRESS
			{
				name: "Завершено",
				code: "COMPLETED",
				icon: "pi pi-check-circle",
				severity: "success",
				filter: true,
			}, // COMPLETED
			{
				name: "Отклонено",
				code: "REJECTED",
				icon: "pi pi-times-circle",
				severity: "danger",
				filter: true,
			}, // REJECTED
			{
				name: "Отменено",
				code: "CANCELED",
				icon: "pi pi-ban",
				severity: "danger",
				filter: true,
			}, // CANCELED
			{
				name: "Истекло",
				code: "EXPIRED",
				icon: "pi pi-clock",
				severity: "danger",
				filter: true,
			}, // EXPIRED
		];
	}

	ngOnInit(): void {
		this.getOrders({ first: 0, rows: this.tablePagination.size });
		this.getBank();
	}

	getStatusFilter() {
		return this.status.filter((status) => status.filter);
	}

	/**
	 *
	 * @param event
	 */
	getOrders(event: any) {
		this.loading = true;
		const page = event.first / event.rows; // Current page (0-based index)
		const size = event.rows; // Number of rows per page

		this._orderService
			.sellRequestsMy({ ...this.orderParam, page, size })
			.subscribe((data) => {
				data.total > 10 ? this.isPagination = true : this.isPagination = false
				console.log(data);
				this.orders = data.result;
				this.tablePagination.totalData = data.total;
				this.loading = false;
				this.loadData = true;
			});
	}

	/**
	 *
	 */
	getBank() {
		this._bankService.getExistingBankMySell().subscribe((bank) => {
			this.bankData = bank;
		});
	}

	/**
	 *
	 */
	filterData() {
		if (this.dateFilter) {
			this.orderParam.filters.date = this.datePipe
				.transform(this.dateFilter, "yyyy-MM-dd")
				?.toString();
		} else {
			delete this.orderParam.filters.date;
		}

		// Status filterini tekshirish
		if (this.statusFilter) {
			this.orderParam.filters.status = this.statusFilter.code;
		} else {
			delete this.orderParam.filters.status;
		}

		if (this.bankFilter) {
			this.orderParam.filters.bank = this.bankFilter.title;
		} else {
			delete this.orderParam.filters.bank;
		}

		this.getOrders({ first: 0, rows: this.tablePagination.size });
	}

	/**
	 *
	 *
	 *
	 *
	 */
	findStatus(sts: string, key: "name" | "code" | "icon" | "severity"): any {
		const item = this.status?.find((f) => f.code === sts);
		return item ? item[key] : "";
	}
}
