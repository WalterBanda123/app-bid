import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService
  ) {}

  itemDetails: any;
  deleteItemHandler() {
    this.itemService.deleteItem(this.itemDetails._id).subscribe((result)=>
    console.log(result)
    );
  }

  ngOnInit(): void {
    this.itemService.getItem(this.data._id).subscribe((item: any) => {
      this.itemDetails = item;
    });
  }
}
