import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckedService {
  private _checkedState = new BehaviorSubject<{state:boolean, text:string}>({state:false, text:''});
  _checked$ = this._checkedState.asObservable();


  private _rangeValue = new BehaviorSubject<Number>(0);
  _rangeValue$ = this._rangeValue.asObservable();


  setRangeValue(value:Number){
    this._rangeValue.next(value);
  }
 

  constructor() {}

  setState(state:boolean, text:string){
    this._checkedState.next({state, text});
    // console.log({state,text});
  }
  

}

