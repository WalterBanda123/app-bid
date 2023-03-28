import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  DoCheck,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

// import { data } from 'src/app/data/cards';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, DoCheck {
  constructor(
    private itemService: ItemService,
    private router: Router,
    private dialog: MatDialog,
    private detecteChanges: ChangeDetectorRef
  ) {}

  // allItems:any= data;
  allItems?: any;

  ngDoCheck(): void {
    this.itemService.getItems().subscribe((data) => {
      this.allItems = [...data.items];
      this.detecteChanges.detectChanges();
    });
  }

  deleteItem(itemId: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { _id: itemId },
    });

    dialogRef.afterClosed().subscribe((state) => {
      if (state === 'true') {
        this.itemService.getItems().subscribe((data) => {
          this.allItems = [...data.items];
          this.detecteChanges.detectChanges();
        });
      }
    });
  }

  addNewItem() {
    this.router.navigate(['add-item']);
    console.log('navigated to the add item page');
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data: any) => {
      this.allItems =  data.items;
      this.detecteChanges.detectChanges();
    });
  }
}
