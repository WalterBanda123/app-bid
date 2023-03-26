import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoBiddingComponent } from './components/auto-bidding/auto-bidding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LoginGuard } from './login.guard';
import { EditItemComponent } from './components/edit-item/edit-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'edit/:itemId',
    component: EditItemComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'item/:itemID',
    component: ItemDetailsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'bid/:id',
    component: AutoBiddingComponent,
    canActivate: [IsAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
