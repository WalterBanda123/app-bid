import { CheckedService } from './../../checked.service';
import { ItemService } from 'src/app/item.service';
import { Component, OnInit, Output,  EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private checkService:CheckedService) { }
  

 
  shareState(state:boolean, text:string){
   this.checkService.setState(state, text)
     
  };

  getRangeValue(value:any){
    this.checkService.setRangeValue(value);
    
  }

  ngOnInit(): void {
  
    this.shareState(false, '')
  }
}

