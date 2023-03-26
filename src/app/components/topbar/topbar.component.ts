import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ItemService } from 'src/app/item.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  userData: any;
  actualUserData?: any;
  usersList?: any;

  LogOut(): void {
    this.dialog.open(DialogComponent);
    localStorage.removeItem('loggedUser');
    // this.authService.logOut()
  }

  getUserData() {
    const data = localStorage.getItem('loggedUser');

    if (data) {
      this.actualUserData = JSON.parse(data);
    }
  }

  ngOnInit(): void {
    // this.itemService.getItems();
    this.itemService.getUsers().subscribe((data: any) => {
      data;

      if (
        // this.authService.isLoggedIn$ &&
        this.authService.token
      ) {
        this.userData = this.authService.getUserWhoIsLogged();

        const user = data.allUsers.find(
          (u: any) => u._id === this.userData.userId
        );
        localStorage.setItem('loggedUser', JSON.stringify(user));

        const latestUser = localStorage.getItem('loggedUser');
        // console.log(latestUser);
        if (latestUser) {
         
          this.actualUserData = JSON.parse(latestUser);
        }
      }
    });
    this.getUserData()
  }
}
