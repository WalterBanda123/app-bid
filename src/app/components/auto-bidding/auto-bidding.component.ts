import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/data/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoBidService } from 'src/app/auto-bid.service';

@Component({
  selector: 'app-auto-bidding',
  templateUrl: './auto-bidding.component.html',
  styleUrls: ['./auto-bidding.component.css'],
})
export class AutoBiddingComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    public autoBidService:AutoBidService,
    private route: Router
  ) {

    this.currentPercentage = parseInt(localStorage.getItem('myPercentage')!) 
    this.currentAmount = parseFloat(localStorage.getItem('myAmount')!);


  }

  ngOnInit(): void {
    this.getItem()
  }

  biddingAmount?:number;
  biddingPercentage?:number;


   currentPercentage?:number 
  currentAmount?:number;

  settingBiddingAmount(){
   
    if(this.biddingAmount !== undefined && this.biddingPercentage !== undefined){
      this.autoBidService.setBiddingAmount(this.biddingAmount!)
      this.autoBidService.setPercentage(this.biddingPercentage!);
    }

    this.autoBidService._biddingAmount$.subscribe((amount) => {
      const amountValue = amount.amount;
      localStorage.setItem('myAmount', amountValue.toLocaleString())
      console.log("amount instorage", localStorage.getItem('myAmount'));
      
      
    });
    this.autoBidService._amountPercentage$.subscribe((percentage) =>
    {
      const percentValue = percentage.percentage;
      localStorage.setItem('myPercentage', percentValue.toLocaleString())

      

    }
    );
    
    this.route.navigate([`/item/${this.selectedItem?._id}`])
    
  }

  

  getValues(){
    this.currentAmount = parseFloat(localStorage.getItem('myAmount')!);
      
    this.currentPercentage = parseInt(localStorage.getItem('myPercentage')!) 
      console.log("percentage in memory", localStorage.getItem('myPercentage'))
      
  }

  selectedItem?: Item;

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.itemService
      .getItem(id)
      .subscribe((item) => (this.selectedItem = item));
      console.log("percentage when visiting page",this.currentPercentage);
      
      this.getValues()
      
  }
}
