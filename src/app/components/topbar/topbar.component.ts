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
    private dialog:MatDialog
  ) {}

  userData: any;
  actualUserData?: any;
  usersList?: any;

  // getActualUser() {
  //  this.userData = this.authService.getUserWhoIsLogged();
  //     this.userData && this.authService.isLoggedIn$

  //       this.actualUserData = this.usersList?.find(
  //         (u: any) => u._id === this.userData.userId
  //       );
  //       console.log(
  //         'actual user data ,data to be displayed',
  //         this.actualUserData
  //       );
  //       console.log('the logged user', this.userData);
  //   // }



  LogOut(): void {
    this.dialog.open(DialogComponent)
    // this.authService.logOut()
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
        this.actualUserData = data.allUsers.find(
          (u: any) => u._id === this.userData.userId
        );
        // console.log(
        //   'actual user data ,data to be displayed',
        //   this.actualUserData
        // );
        // console.log('users pechi two', this.usersList);

        // console.log('the logged user', this.userData);
      }
    });
  }
}
