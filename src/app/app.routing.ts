import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';

const appRoutes : Routes = [
    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
    },
    {
        path : 'login',
        component : LoginPageComponent,
    },
    {
        path : 'user',
        component: UserPortalComponent,
    }
];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
