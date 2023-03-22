import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private itemService:ItemService,private modalService: NgbModal){}


  allItems:any

  open() {
    this.modalService.open('this works so far');
  }

  ngOnInit(): void {
    //  this.getItems() 
      this.itemService.getItems().subscribe((data:any)=>{
      this.allItems = data.items;
      console.log(data.items);}) 
  }

}
