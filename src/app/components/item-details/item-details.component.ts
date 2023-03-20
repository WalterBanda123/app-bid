import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/data/item';
import { Location, Time } from '@angular/common';
// import { cards } from 'src/app/data/cards';

import { ItemService } from 'src/app/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService
  ) {}

  items: any;
  selectedItem?: Item;
   
  bidItem():void{
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    const new_price = Number(this.selectedItem?.startBid) + 10
    this.itemService.updateItem(new_price , id).subscribe(
      (data:any)=> console.log(data)
      
    )
  
  }

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    
    this.itemService
      .getItem(id)
      .subscribe((item:Item) => (this.selectedItem = item));
  }

  // getTimeCount(){
  //   const d = new Date();
  //   const s = d.getSeconds().toString().padStart(2, '0');
  //   const m = d.getMinutes().toString().padStart(2, '0');
  //   const h = d.getHours().toString().padStart(2, '0');
   
  //   return {s,m,h} ;
  //   // setInterval(time, 1000);
  // };
  
  getItems() {
  this.itemService
      .getItems()
      .subscribe((data: Item[]) => {
        this.items = data
      });
      
  }

  ngOnInit(): void {
    this.getItems()
    this.getItem();
    
  }
}
