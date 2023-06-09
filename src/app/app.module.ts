import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AutoBiddingComponent } from './components/auto-bidding/auto-bidding.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopbarComponent,
    SidebarComponent,
    ItemsComponent,
    ItemDetailsComponent,
    AutoBiddingComponent,
    LoginComponent,
    AdminComponent,
    AddItemComponent,
    DialogComponent,
    EditItemComponent,
    DeleteDialogComponent,
    MessageComponent,
    BiddingComponent,
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('authenticatedUser'),
      },
    }),
    MatDialogModule,
    CountdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
