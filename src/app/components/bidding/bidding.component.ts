import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],
})
export class BiddingComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService
  ) {
    this.currentItem = this.data._item;
  }

  currentItem: any = this.data._item;
  bidItemHandler(bid: NgForm | any): void {
    const bidPlaced = Number(bid.value?.['newBid']);
    // console.log(bidPlaced, this.currentItem);

    this.itemService
      .autoBidItem(this.data._id, bidPlaced)
      .subscribe((data: any) => console.log(data));
  }

  ngOnInit(): void {}
}
