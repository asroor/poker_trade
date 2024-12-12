import { Component } from "@angular/core";
import { BankService, OrderService } from "../../../../../../shared";
import { environment } from "../../../../../../../environments/environment";
import { IBank, IOrderMy, ISellRequestsMy } from "../../../../../../interface";
import { DatePipe } from "@angular/common";

export interface IStatus {
  name: string;
  code: string;
}

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

  status: IStatus[] | undefined;
  selectBank: undefined;
  selectStatus: IStatus | undefined;
  bankData!: IBank[];

  constructor(
    private _orderService: OrderService,
    private _bankService: BankService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getOrders({ first: 0, rows: this.tablePagination.size });
    this.getBank();

    /**
     *
     */
    this.status = [
      { name: "Новое", code: "NEW" }, // NEW
      { name: "Модерация", code: "MODERATION" }, // MODERATION
      { name: "В процессе", code: "IN_PROGRESS" }, // IN_PROGRESS
      { name: "Завершено", code: "COMPLETED" }, // COMPLETED
      { name: "Отклонено", code: "REJECTED" }, // REJECTED
      { name: "Отменено", code: "CANCELED" }, // CANCELED
    ];
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
    }
    if (this.statusFilter) {
      this.orderParam.filters.status = this.statusFilter.code;
    }
    if (this.bankFilter) {
      this.orderParam.filters.bank = this.bankFilter.title;
    }
    console.log(this.orderParam.filters);
    this.getOrders({ first: 0, rows: this.tablePagination.size });
  }

  /**
   *
   * @param status
   * @returns
   */
  getIcon(status: string): string {
    const icons: Record<string, string> = {
      NEW: "pi pi-clock",
      MODERATION: "pi pi-search",
      IN_PROGRESS: "pi pi-spinner pi-spin",
      COMPLETED: "pi pi-check-circle",
      REJECTED: "pi pi-times-circle",
      CANCELED: "pi pi-ban",
      EXPIRED: "pi pi-calendar-times",
    };
    return icons[status] || "";
  }

  /**
   *
   * @param status
   * @returns
   */
  getSeverity(
    status: string
  ): "success" | "secondary" | "info" | "warning" | "danger" | undefined {
    const severities: Record<
      string,
      "success" | "secondary" | "info" | "warning" | "danger"
    > = {
      NEW: "info",
      MODERATION: "warning",
      IN_PROGRESS: "info",
      COMPLETED: "success",
      REJECTED: "danger",
      CANCELED: "danger",
      EXPIRED: "secondary",
    };
    return severities[status];
  }

  /**
   *
   * @param status
   * @returns
   */
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      NEW: "Новое",
      MODERATION: "Модерация",
      IN_PROGRESS: "В процессе",
      COMPLETED: "Завершено",
      REJECTED: "Отклонено",
      CANCELED: "Отменено",
      EXPIRED: "Истек",
    };
    return labels[status] || "";
  }
}
