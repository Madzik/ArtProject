import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ViewItemComponent } from './components/view-item/view-item.component';

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
    },
    {
        path : 'add-item',
        component: AddItemComponent,
    },
    {
        path : 'view-items',
        component: ViewItemsComponent,
    },
    {
        path : 'view-item/:id',
        component: ViewItemComponent,
    }
];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
