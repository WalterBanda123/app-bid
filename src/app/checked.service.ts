import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckedService {
  private _checkedState = new Subject<{state:boolean, text:string}>();
  _checked$ = this._checkedState.asObservable();


  private _rangeValue = new Subject<Number>();
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

