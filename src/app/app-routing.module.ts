import { ItemsComponent } from './components/items/items.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoBiddingComponent } from './components/auto-bidding/auto-bidding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
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
