import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  constructor(private itemService: ItemService, private router:Router) {}

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
      this.router.navigate(['/admin'])
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {}
}
