import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceprors/auth.interceptor';
import { ErrorInterceptor } from './shared/interceprors/error.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
	declarations: [
		AppComponent,
		LayoutsComponent,
		AuthComponent,
		NavbarComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,
		ButtonModule,
		AppRoutingModule,
		TooltipModule,
		DialogModule,
		ReactiveFormsModule,
		AvatarModule,
		BrowserAnimationsModule,
		HttpClientModule,
		InputTextModule,
		ToastModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		MessageService 
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
