import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  constructor(private itemService: ItemService) {}

  addItem(itemDetails: NgForm) {
    console.log(itemDetails.value);

    try {
      if(itemDetails.invalid && itemDetails.untouched){
        console.log("enter content first"); 
        return ;
      }
      this.itemService.createItem(itemDetails.value).subscribe((item) => {
        console.log(item.itemCreated);
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {}
}
