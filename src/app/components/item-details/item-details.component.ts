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
    private timerService: TimerService
  ) {
    // this.autoBidState = {AutoBidActivated:'Checked',AutoBidDeactivated:'Unchecked'}
    this.isChecked = localStorage.getItem('autoBidState');
  }
  // config: CountdownConfig = {
  //   leftTime: 60 * 60 * 25,
  //   formatDate: ({ date, formatStr }) => {
  //     let duration = Number(date || 0);

  //     return CountdownTimeUnits.reduce((current, [name, unit]) => {
  //       if (current.indexOf(name) !== -1) {
  //         const v = Math.floor(duration / unit);
  //         duration -= v * unit;
  //         return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
  //           return v.toString().padStart(match.length, '0');
  //         });
  //       }
  //       return current;
  //     }, formatStr); savingTimeLeft() {
  // localStorage.setItem('timeLeft', JSON.stringify(this.config.leftTime));

  //   },
  // };

  private readonly AUTOBID_AMOUNT = 1.5;

  ngDoCheck(): void {

    this.countDownTime;
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
              'The budget has reached below 90%, you are adviced to turn off auto-bidding or increase your budget.'
            );

            this.dialog.open(MessageComponent, {
              data: { currentBudget: minimunBudget },
            });
          }
        });

        localStorage.setItem('autobid', JSON.stringify(budget));
        const id = this.activatedRoute.snapshot.paramMap.get('itemID')!;
        this.itemService
          .autoBidItem(id, autoBid)
          .subscribe((data: any) =>
            console.log('The value changed by auto bid', data)
          );
      });
    }
  }

  items: any;
  selectedItem: Item |any;
  isChecked?: any;
  checkedItemId: any;
  countDownTime: any;

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

    this.itemService.getItem(id).subscribe((item: Item) => {
      this.selectedItem = item;
      this.updateCountDownTime(item.bidTime!);
      this.detectChanges.detectChanges();
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
  }
}
