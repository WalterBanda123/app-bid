import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _valueChange = new Subject<{ price: number }>();
  _valueChange$ = this._valueChange.asObservable();

  setValue(price: number) {
    this._valueChange.next({ price });
  }

  //--SETTING UP SUBJECT FOR RENDERING THE MESSAGE FOR AUTOBID BUDGETS LIMIT

  private _message = new Subject<{ message: string }>();
  _message$ = this._message.asObservable();

  setMessage(message: string) {
    this._message.next({ message });
  }
  //--SETTING THE BUDGETS
  private _budget = new Subject<{ value: number }>();
  _budget$ = this._budget.asObservable();

  setCurrentBudget(value: number) {
    this._budget.next({ value });
  }

  private _autoBiddingBudgetAndPercentage = new Subject<{
    amount: number;
    percentage: number;
  }>();
  _autoBiddingBudgetAndPercentage$ =
    this._autoBiddingBudgetAndPercentage.asObservable();

  setBiddingBudgetAndPercentage(amount: number, percentage: number) {
    this._autoBiddingBudgetAndPercentage.next({ amount, percentage });
  }

  constructor() {}
}
