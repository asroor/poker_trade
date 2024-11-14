import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutsComponent,
		children: [
			{
				path: 'home',
				loadChildren: () => import('./features').then((m) => m.HomeModule)
			},
			{
				path: 'withdrawal',
				loadChildren: () => import('./features').then((m) => m.WithdrawalModule)
			},
			{
				path: 'deposit/:id',
				loadChildren: () => import('./features').then((m) => m.DepositFormModule)
			},
			{
				path: 'account',
				loadChildren: () => import('./features').then((m) => m.AccountModule)
			},
			{
				path: 'order',
				loadChildren: () => import('./features').then((m) => m.OrderModule)
			},
			{
				path: 'profile',
				loadChildren: () => import('./features').then((m) => m.ProfileModule)
			},
			{
				path: '**', redirectTo: '/home', pathMatch: 'full'
			}
		]
	},
	{ path: 'auth/:token', component: AuthComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
