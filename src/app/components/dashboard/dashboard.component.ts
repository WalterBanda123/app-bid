import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

constructor(private itemService:ItemService, private authService:AuthService){}

  
  
  getLoggedUser() {
    
  }

ngOnInit(): void {
  this.itemService.getItems()
}

}
