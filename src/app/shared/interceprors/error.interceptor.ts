import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthModalService } from '../../auth/auth.modal.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private modalService: AuthModalService,  private msg: MessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.openModal()
                    this.handle401Error();
                }
                this.handleError(error)
                return throwError(error);
            })
        );
    }

    private handle401Error() {
        this.router.navigate(['/login']);
    }

    openModal() {
        if (this.isUserLoginned()) {
            this.router.navigate(['/profile'])
        } else {
            this.modalService.openModal();
        }
    }

    isUserLoginned() {
        return localStorage.getItem('telegramToken') != null
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
		// if (err instanceof ErrorEvent) {
        //     this.msg.add({ severity: 'error', summary: `Статус ошибки: ${err}`, detail: err });
		// } else {
            
        // }
        this.msg.add({ severity: 'error', summary: `Статус ошибки: ${err.status}`, detail: JSON.stringify(err.error.message) });
		return throwError(() => err);
	}
}