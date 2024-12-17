import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutsComponent,
		children: [
			{ path: 'profile/token/:token', component:  ProfileComponent},
			{
				path: 'home',
				loadChildren: () => import('./features').then((m) => m.HomeModule),
			},
			{
				path: 'sell-request',
				loadChildren: () => import('./features').then((m) => m.AccountModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'account',
				loadChildren: () => import('./features').then((m) => m.AccountModule),
				canActivate: [AuthGuard],
			},
			{
				path: 'profile',
				loadChildren: () => import('./features').then((m) => m.ProfileModule),
				canActivate: [AuthGuard],
			},
			{
				path: '**', redirectTo: '/home', pathMatch: 'full'
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
