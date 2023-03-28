import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/data/item';
import { ActivatedRoute } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/messages.service';
import { Location } from '@angular/common';

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
    private messageService: MessagesService,
    private location: Location
  ) {}

  currentAmountBudget: any;
  currentPercentageSet: any;

  settingBiddingAmount(value: NgForm) {
    const fields = value.value;

    const floatValue = parseFloat(fields['bid-alert']) / 100;
    console.log(floatValue);

    const maximumValue = parseFloat(fields['bid-amount']) * floatValue;
    const minimunBudget = parseFloat(fields['bid-amount']) - maximumValue;

    console.log(minimunBudget);

    localStorage.setItem('minimunBudget', JSON.stringify(minimunBudget));

    this.messageService.setBiddingBudgetAndPercentage(
      fields['bid-amount'],
      fields['bid-alert']
    );
    localStorage.setItem('autobid', JSON.stringify(fields));
    console.log(fields['bid-amount'], fields['bid-alert']);
    this.location.back();
  }

  ngOnInit(): void {
    this.getItem();
  }

  selectedItem?: Item;

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    const values = JSON.parse(localStorage.getItem('autobid')!);
    if(values){

      (this.currentAmountBudget = values['bid-amount']!),
        (this.currentPercentageSet = values['bid-alert']!);
    }
    this.itemService
      .getItem(id)
      .subscribe((item) => (this.selectedItem = item));
  }
}
