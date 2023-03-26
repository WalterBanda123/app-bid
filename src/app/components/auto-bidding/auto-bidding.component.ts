import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/data/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auto-bidding',
  templateUrl: './auto-bidding.component.html',
  styleUrls: ['./auto-bidding.component.css'],
})
export class AutoBiddingComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    public autoBidService: AutoBidService,
    private route: Router,
    private changeDetector:ChangeDetectorRef
  ) {
    // this.currentPercentage = parseInt(localStorage.getItem('myPercentage')!);
    // this.currentAmount = parseFloat(localStorage.getItem('myAmount')!);
  }

  currentAmountBudget: any;
  currentPercentageSet: any;

  settingBiddingAmount(value: NgForm) {
    const fields = value.value;
    console.log(fields['bid-amount'], fields['bid-alert']);

    localStorage.setItem('autoBid', JSON.stringify(fields));
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('autoBid'));
    const obj = JSON.parse( localStorage.getItem('autoBid')!);

    this.currentAmountBudget = obj["bid-amount"];
    this.currentPercentageSet = obj["bid-alert"]
     this.changeDetector.markForCheck()
    this.getItem();
  }

  //   if(this.biddingAmount !== undefined && this.biddingPercentage !== undefined){
  //     this.autoBidService.setBiddingAmount(this.biddingAmount!)
  //     this.autoBidService.setPercentage(this.biddingPercentage!);
  //   }

  //   this.autoBidService._biddingAmount$.subscribe((amount) => {
  //     const amountValue = amount.amount;
  //     localStorage.setItem('myAmount', amountValue.toLocaleString())
  //     console.log("amount instorage", localStorage.getItem('myAmount'));

  //   });
  //   this.autoBidService._amountPercentage$.subscribe((percentage) =>
  //   {
  //     const percentValue = percentage.percentage;
  //     localStorage.setItem('myPercentage', percentValue.toLocaleString())

  //   }
  //   );

  //   this.route.navigate([`/item/${this.selectedItem?._id}`])

  // }

  // getValues() {
  //   this.currentAmount = parseFloat(localStorage.getItem('myAmount')!);

  //   this.currentPercentage = parseInt(localStorage.getItem('myPercentage')!);
  //   console.log('percentage in memory', localStorage.getItem('myPercentage'));
  // }

  selectedItem?: Item;

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.itemService
      .getItem(id)
      .subscribe((item) => (this.selectedItem = item));

    console.log(
      this.autoBidService._biddingAmount$.subscribe((data) => console.log(data))
    );
  }
}
