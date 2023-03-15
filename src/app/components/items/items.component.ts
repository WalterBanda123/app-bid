import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/data/item';
// import { cards } from 'src/app/data/cards';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(private itemService: ItemService) {}



  items: any;
  ngOnInit() {
  this.itemService
      .getItems()
      .subscribe((data) => {
        this.items = data.items
        console.log(data.message);
        
      });

      console.log(this.items);
      
  }

  
  
  //--initialize  items viariable

  selectedItem?: Item;
  onSelectedItem(item: Item): void {
    this.selectedItem = item;
    console.log('clicked');
  }
}
