import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/data/user';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private router: Router,
    private authService: AuthService
  ) {}

  @Input() user?: User;

  users?: User[];
  result: any;
  _userId?: string;

  getUserCredentials(userCredentials?: NgForm) {
    if (userCredentials?.invalid && userCredentials?.untouched) {
      return console.log('No user tried logging in');
    }

    try {
      this.authService.authUser(userCredentials?.value).subscribe((data: any) => {
        if (data.token) {
          this._userId = data._id;
        }

        this.user = this.users?.find((u: User) => u._id === this._userId);
        if (this.user) {
          this.router.navigate([`dashboard`]);
        }
        console.log(`${this.user?.fullName} HAS LOGGED IN...`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.itemService.getUsers().subscribe((data: any) => {
      this.users = data.allUsers;
    });
    this.getUserCredentials();
  }
}
