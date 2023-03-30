import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/data/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/messages.service';
import { Location } from '@angular/common';
import { User } from 'src/app/data/user';
import { BiddingService } from 'src/app/bidding.service';

@Component({
  selector: 'app-auto-bidding',
  templateUrl: './auto-bidding.component.html',
  styleUrls: ['./auto-bidding.component.css'],
})
export class AutoBiddingComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    public autoBidService: AutoBidService,
    private biddingService: BiddingService,
    private location: Location,
    private router: Router
  ) {}

  currentAmountBudget?: any;
  currentPercentageSet?: any;
  selectedItem?: Item;
  user: User | any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')!);
    this.currentAmountBudget = this.user.amount;
    this.currentPercentageSet = this.user.percentage;
  }

  goBack(): void {
    this.location.back();
  }

  createBudget(inputs: NgForm): void {
    console.log(inputs.value);

    if (inputs.invalid && inputs.untouched) {
      return console.log(`${inputs.value}: there are no values entered`);
    }

    if (inputs.valid && inputs.touched) {
      const fields = inputs.value;
      this.itemService
        .getUserAutobidBudget(this.user._id, {
          amount: fields['amount'],
          percentage: fields['percentage'],
        })
        .subscribe((result) => {
          console.log(result);
        });
    }

    this.location.back();
  }
}
