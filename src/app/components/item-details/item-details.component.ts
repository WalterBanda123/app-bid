import { Component, OnInit } from '@angular/core';
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
export class ItemDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private autoBidService: AutoBidService
  ) {
    // this.autoBidState = {AutoBidActivated:'Checked',AutoBidDeactivated:'Unchecked'}
    this.isChecked = localStorage.getItem('autoBidState')
    console.log(this.isChecked);
    
  }

  items: any;
  selectedItem?: Item;
  isChecked?:any
  checkedItemId:any


  bidItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    const new_price = Number(this.selectedItem?.startBid) + 10;
    this.itemService
      .updateItem(new_price, id)
      .subscribe((data: any) => console.log(data));
  }

  autoBid() {
    const autoBidState: any = {
      AutoBidActivated: 'Checked',
      AutoBidDeactivated: 'Unchecked',
    };

    if (
      this.autoBidService._autoBidState$ &&
      this.autoBidService._currentBidPrice$
    ) {
      this.autoBidService._autoBidState$.subscribe((state) => {
        if (state.state === true) {
          
          localStorage.setItem('autoBidState', autoBidState.AutoBidActivated );

          this.autoBidService._currentBidPrice$.subscribe((price) => {
            price.price = price.price + 1.50;
 
            //SETTING UP THE CHECKED ITE ID
            this.checkedItemId = state.text

            this.autoBidService._biddingAmount$.subscribe((amount)=>{
              // let reservedAmount = parseFloat(localStorage.getItem('myAmount')!);
              amount.amount = amount.amount - 1.50;
              localStorage.setItem('myAmount', amount.amount.toString());
              console.log(amount);
            })
            

            this.itemService
              .updateItem(price.price, state.text)
              .subscribe((data: any) =>
                console.log('data with new price new price', data)
              );
          });
        }
      });
    }
    localStorage.setItem('autoBidState', autoBidState.AutoBidDeactivated);
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
    console.log(this.isChecked);
    // this.autoBid();
  }
}
