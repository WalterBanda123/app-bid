import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoBidService {

  private autoBidState = new Subject<{state:boolean, text:string}>();
  _autoBidState$ = this.autoBidState.asObservable();

  private _currentBidPrice = new Subject<{price:number}>();
  _currentBidPrice$ = this._currentBidPrice.asObservable();


public _biddingAmount = new Subject<{amount: number}>();
_biddingAmount$ = this._biddingAmount.asObservable();


public _amountPercentage = new Subject<{percentage:number}>();
_amountPercentage$ = this._amountPercentage.asObservable()

setPercentage(percentage:number){
  this._amountPercentage.next({percentage})

}

setBiddingAmount(amount:number){

 this._biddingAmount.next({ amount });
}

  setAutoBid(state:boolean, text:string){
    this.autoBidState.next({state, text})

  }

  setBidPrice(price:number){
    this._currentBidPrice.next({price})
  }

  constructor() { }
}
