import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';

// import { data } from 'src/app/data/cards';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private changeDetectorRef: ChangeDetectorRef,
    private router:Router
  ) {}

  // allItems:any= data;
  allItems?: any;

  deleteItem(itemId: string) {
    this.itemService.deleteItem(itemId).subscribe((res) => {
      console.log('item id deleted', res._id);
      setTimeout(() => {
        this.allItems;
        this.changeDetectorRef.detectChanges();
        this.allItems;

        console.log(this.changeDetectorRef.detectChanges());
        
      }, 1000);
    });
  }


  addNewItem(){
    this.router.navigate(['add-item'])
    console.log('navigated to the add item page');
    
  }

  ngOnInit(): void {
    //  this.getItems()
    this.itemService.getItems().subscribe((data: any) => {
      this.allItems = data.items;
      console.log('my items', data.items);
    });
  }

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(DialogComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
}
