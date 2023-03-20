import { CheckedService } from 'src/app/checked.service';
import { ItemService } from './../../item.service';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/data/item';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(
    private itemService:ItemService,
    private checkedService:CheckedService
     ) { 

      
   }
  
  items: any;
 

  ngOnInit() {
    this.itemService.getItems().subscribe((data: any) => {
     
      if(this.checkedService._checked$){

        this.checkedService._checked$.subscribe((state) => {
  
          if(state.state === false){
            this.items = data.items;
          }
          if (state.state === true) {
            this.items = data.items.filter(
              (data: any) => data.category === state.text
            );
          }
          
          
        });
      }

      if(this.checkedService._rangeValue$){
        this.checkedService._rangeValue$.subscribe((value) => {
  
          if(!value){
            this.items = data.items;
          }
         
            this.items = data.items.filter(
              (data: any) => data.startBid <= value
            );
        })
      }

       this.items = data.items;
    });
  } 
    
  

  //--initialize  items viariable

  selectedItem?: Item;
  onSelectedItem(item: Item): void {
    this.selectedItem = item;
    console.log('clicked');
  }
}
