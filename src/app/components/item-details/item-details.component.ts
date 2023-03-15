import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/data/item';
import { Location } from '@angular/common';
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
    private location: Location,
    private itemService: ItemService
  ) {}

  items: any;
  selectedItem?: Item;
  
  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    this.itemService
      .getItem(id)
      .subscribe((item:Item) => (this.selectedItem = item));
  }

 
  getItems() {
  this.itemService
      .getItems()
      .subscribe((data: Item[]) => {
        this.items = data
      });

      console.log(this.items);
      
  }

  ngOnInit(): void {
    this.getItems()
    this.getItem()
  }
}
