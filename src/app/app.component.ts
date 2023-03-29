import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BiddingComponent } from './components/bidding/bidding.component';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-bid';

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private messageService: MessagesService
  ) {}
  
}
