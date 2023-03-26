import { Component, OnInit, DoCheck } from '@angular/core';
import { Item } from 'src/app/data/item';
// import { cards } from 'src/app/data/cards';

import { ItemService } from 'src/app/item.service';
import { ActivatedRoute } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit, DoCheck {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private autoBidService: AutoBidService
  ) {
    // this.autoBidState = {AutoBidActivated:'Checked',AutoBidDeactivated:'Unchecked'}
    this.isChecked = localStorage.getItem('autoBidState');

    console.log(
      autoBidService._currentBidPrice$.subscribe((state) => console.log(state))
    );
  }

  ngDoCheck(): void {
    // this.autoBid()
    if (
      this.isChecked 
    ) {
      console.log(this.isChecked);
      
      this.autoBidService._autoBidState$.subscribe((data) => {
        const priceSet = parseInt(JSON.parse(localStorage.getItem('price')!));
        console.log(priceSet);
        
        
          this.autoBidService._currentBidPrice$.subscribe((price) => {
            if (priceSet !== price.price) {
              const newPrice = price.price + 1.5;
              this.itemService
                .autoBidItem(data.text, newPrice)
                .subscribe((data) => console.log(data));
            }
          });
        
      });}

  }

  items: any;
  selectedItem?: Item;
  isChecked?: any;
  checkedItemId: any;

  bidItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    const new_price = Number(this.selectedItem?.startBid) + 10;
    this.itemService
      .updateItem(new_price, id)
      .subscribe((data: any) => console.log(data));

    localStorage.setItem('price', JSON.stringify(new_price));
  }

  autoBid() {
    if (
      this.isChecked 
    ) {
      console.log(this.isChecked);
      
      this.autoBidService._autoBidState$.subscribe((data) => {
        const priceSet = parseInt(JSON.parse(localStorage.getItem('price')!));
        console.log(priceSet);
        
        
          this.autoBidService._currentBidPrice$.subscribe((price) => {
            if (priceSet !== price.price) {
              const newPrice = price.price + 1.5;
              this.itemService
                .autoBidItem(data.text, newPrice)
                .subscribe((data) => console.log(data));
            }
          });
        
      });

      //   price.price += 1.5;
      //   this.autoBidService.setBidPrice(price.price)
      //   const autoBidDetails = JSON.parse(localStorage.getItem('autoBid')!);
      //   autoBidDetails['bid-amount'] -= 1.5;

      //   console.log(price.price);

      //   console.log(autoBidDetails);

      //   localStorage.setItem('autoBid', autoBidDetails)
      //     return price.price
      // });
    }
  }

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;

    this.itemService.getItem(id).subscribe((item: Item) => {
      this.selectedItem = item;
      this.autoBidService.setBidPrice(this.selectedItem.startBid!);
    });
  }

  setAutoBidingHandler(state: boolean, text: string) {
    this.autoBidService.setAutoBid(state, text);
  }

  getItems() {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  ngOnInit(): void {
    this.getItems();
    this.getItem();
    this.autoBid()
    // this.autoBid();
  }
}
