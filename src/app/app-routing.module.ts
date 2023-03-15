import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoBiddingComponent } from './components/auto-bidding/auto-bidding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'item/:itemID', component: ItemDetailsComponent },
  { path: 'bid/:id', component: AutoBiddingComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
