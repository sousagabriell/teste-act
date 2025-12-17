import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./teste-act/presentation/page/home/home').then(m => m.Home),
	},
	{
		path: 'add',
		loadComponent: () => import('./teste-act/presentation/page/add/add').then(m => m.Add),
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];
