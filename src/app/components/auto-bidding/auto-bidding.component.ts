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
    private router: Router,
    private activeRoute:ActivatedRoute
  ) {

    this.userLoggedIn = JSON.parse(localStorage.getItem('loggedUser')!);
    
  }

  userLoggedIn:any
  currentAmountBudget?: any;
  currentPercentageSet?: any;
  selectedItem?: Item;
  user: User | any;



  goBack(): void {
    this.location.back();
  }

  createBudget(inputs: NgForm): void {
    console.log(inputs.value);

    const id = this.activeRoute.snapshot.paramMap.get('itemID')!;
    if (inputs.invalid && inputs.untouched) {
      return console.log(`${inputs.value}: there are no values entered`);
    }

    if (inputs.valid && inputs.touched) {
      const fields = inputs.value;

      console.log(this.userLoggedIn);

      this.itemService
        .getUserAutobidBudget(this.userLoggedIn._id, {
          amount: fields['amount'],
          percentage: fields['percentage'],
        })
        .subscribe((result) => {
          console.log(result);
        });
    }



    this.router.navigate([`/item/${id}`])
    this.location.back();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')!);
    console.log(this.user, this.userLoggedIn);

    this.currentAmountBudget = this.user.amount;
    this.currentPercentageSet = this.user.percentage;
  }
}
