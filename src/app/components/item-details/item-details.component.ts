import { Component, OnInit, DoCheck } from '@angular/core';
import { Item } from 'src/app/data/item';
import { MatDialog } from '@angular/material/dialog';
// import { cards } from 'src/app/data/cards';

import { ItemService } from 'src/app/item.service';
import { ActivatedRoute } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';
import { MessagesService } from 'src/app/messages.service';
import { MessageComponent } from '../message/message.component';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit, DoCheck {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private autoBidService: AutoBidService,
    private messageService: MessagesService,
    private dialog: MatDialog
  ) {
    // this.autoBidState = {AutoBidActivated:'Checked',AutoBidDeactivated:'Unchecked'}
    this.isChecked = localStorage.getItem('autoBidState');
  }
  private readonly AUTOBID_AMOUNT = 1.5;

  ngDoCheck(): void {
    const budget = JSON.parse(localStorage.getItem('autobid')!);
    if (
      this.isChecked &&
      this.messageService._valueChange$ &&
      budget['bid-amount'] >= 0
    ) {
      this.messageService._valueChange$.subscribe((value) => {
        const autoBid = value.price + this.AUTOBID_AMOUNT;
        budget['bid-amount'] -= this.AUTOBID_AMOUNT;

        this.messageService.setCurrentBudget(budget['bid-amount']);

        this.messageService._budget$.subscribe((budget) => {
          const minimunBudget = JSON.parse(
            localStorage.getItem('minimunBudget')!
          );

          if (budget <= minimunBudget) {
            this.messageService.setMessage(
              'The budget has reached bellow 90%, you are adviced to turn off auto-bidding or increase your budget.'
            );

            this.dialog.open(MessageComponent, {
              data: { currentBudget: minimunBudget },
            });
          }
        });

        localStorage.setItem('autobid', JSON.stringify(budget));
        const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
        this.itemService
          .updateItem(autoBid, id)
          .subscribe((data: any) =>
            console.log('The value changed by auto bid', data)
          );
      });
    }
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

    this.messageService.setValue(new_price);

    localStorage.setItem('price', JSON.stringify(new_price));
  }

  autoBid() {
    if (this.isChecked) {
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
    this.autoBid();
    console.log(localStorage.getItem('autobid'));
  }
}
