import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Item } from 'src/app/data/item';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
// import { cards } from 'src/app/data/cards';
import { CountdownConfig } from 'ngx-countdown';
import { ItemService } from 'src/app/item.service';
import { ActivatedRoute } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';
import { MessagesService } from 'src/app/messages.service';
import { MessageComponent } from '../message/message.component';
import { BiddingComponent } from '../bidding/bidding.component';
import { TimerService } from 'src/app/timer.service';
import { BiddingService } from 'src/app/bidding.service';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent implements OnInit, DoCheck {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private autoBidService: AutoBidService,
    private messageService: MessagesService,
    private dialog: MatDialog,
    private detectChanges: ChangeDetectorRef,
    private timerService: TimerService,
    private biddingServing: BiddingService
  ) {
    // this.autoBidState = {AutoBidActivated:'Checked',AutoBidDeactivated:'Unchecked'}

    this.userLoggedIn = JSON.parse(localStorage.getItem('loggedUser')!);

    this.isActived = JSON.parse(localStorage.getItem('checkboxState')!);
    this.bidAmount = JSON.parse(localStorage.getItem('currentPrice')!);

    // if(this.isActived && de)
    // console.log(this.isChecked);
    // console.log('isActivated', this.isActived);

    if (this.isActived && this.isActived.state === true) {
      this.itemService.getItem(this.isActived.text).subscribe((item) => {
        autoBidService._currentBidPrice$.subscribe((price) => {
          if (this.bidAmount.price !== price.price) {
            item.startBid! += this.AUTOBID_AMOUNT;
            this.userLoggedIn.amount -= this.AUTOBID_AMOUNT;
            itemService
              .getNewBudget(this.userLoggedIn._id, this.userLoggedIn.amount)
              .subscribe((result) => {});
            this.itemService
              .autoBidItem(this.isActived.text, item.startBid!)
              .subscribe((result) => {
                console.log(result);
              });
          }
        });

        this.detectChanges.detectChanges();
      });
    }
  }

  private readonly AUTOBID_AMOUNT = 5;
  ngDoCheck(): void {}

  items: any;
  selectedItem: Item | any;
  isChecked?: any;
  checkBoxState: boolean = false;
  countDownTime: any;
  userLoggedIn: any;
  isAmountAndPercentageAvailable: any;
  isActived: any;
  bidAmount: any;
  userCheckBoxState: any;

  isCheckedHandler(): void {
    // if (this.isActived.state === true) {
    this.biddingServing.getBidList().subscribe((list) => {
      const bidList = list.bidList;
      

      const bid = bidList.find(
        (bid: any) =>
          bid._itemId[0] === this.isActived.text &&
          bid._userId[0] === this.userLoggedIn._id
      );

      if (bid) {
        this.biddingServing.isBidActive(true, bid._id).subscribe((result) => {
          console.log(result);
        });
      } else if (bid === undefined) {
        console.log('didnt find bid, creating new bid');

        const newBid = {
          isActive: this.isActived.state,
          _itemId: this.isActived.text,
          _userId: this.userLoggedIn._id,
        };
        console.log('new bid', newBid);

        this.biddingServing.createNewBid(newBid).subscribe((result) => {
          console.log(result.message);
        });
      } else {
        return console.log(bid);
      }
    });
  }

  setBid(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
    this.itemService.getItem(id).subscribe((itemFetched) => {
      const dialogRef = this.dialog.open(BiddingComponent, {
        data: { _item: itemFetched, _id: id },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'true') {
          this.itemService.getItem(id).subscribe((itemFetched) => {
            this.selectedItem = itemFetched;

            this.detectChanges.detectChanges();
          });
        } else {
          console.log("you didn't place a bid");
        }
      });
    });
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

    this.itemService.getItem(id).subscribe((item: any) => {
      this.selectedItem = item;
      this.autoBidService.setBidPrice(item.startBid!);

      // this.biddingServing.getBidList().subscribe((list) => {
      //   const bidList = list.bidList;
      //   console.log(bidList);

      //   const bid = bidList.find(
      //     (bid: any) =>
      //       bid._itemId[0] === item._id &&
      //       bid._userId[0] === this.userLoggedIn._id
      //   );

      //   this.userCheckBoxState = bid.isActive;

      //   console.log(this.bidAmount.price, this.selectedItem);
      // });
      this.updateCountDownTime(item.bidTime!);
      this.detectChanges.detectChanges();
    });
  }

  setAutoBidingHandler(state: boolean, text: string) {
    this.autoBidService.setAutoBid(state, text);
    this.autoBidService._biddingAmount$.subscribe((amount) => {
      this.bidAmount = amount;
      console.log(amount);
    });
  }

  getItems() {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  updateCountDownTime(targetDate: string): void {
    this.countDownTime = this.timerService.getCountDownTime(targetDate);
    setTimeout(() => {
      this.updateCountDownTime(targetDate);
    }, 1000);
  }

  ngOnInit(): void {
    this.getItems();
    this.getItem();
    this.autoBid();
    this.isCheckedHandler();

    if (
      this.userLoggedIn &&
      this.userLoggedIn.amount > 0 &&
      this.userLoggedIn.percentage > 0
    ) {
      this.isAmountAndPercentageAvailable = true;
    } else {
      this.isAmountAndPercentageAvailable = false;
    }
    this.autoBidService._autoBidState$.subscribe((data) => {
      // localStorage.setItem('autobidState', JSON.stringify(data));

      localStorage.setItem('checkboxState', JSON.stringify(data));
      console.log('activated state', this.isActived);
    });

    this.autoBidService._currentBidPrice$.subscribe((price) => {
      localStorage.setItem('currentPrice', JSON.stringify(price));
    });
  }
}
