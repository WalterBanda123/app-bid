import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditItemComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private detectChanges: ChangeDetectorRef,
    private location:Location
  ) {}

  selectedItem: any;

  updatedItem(newchanges: NgForm) {
    console.log(newchanges.value);
    try {
      if (newchanges.invalid && newchanges.untouched) {
        return;
      }

      const values = newchanges.value;

      //   {
      //     "name": "",
      //     "newBid": "",
      //     "bidTime": "",
      //     "description": "",
      //     "category": ""
      // }
      const id = this.activatedRoute.snapshot.paramMap.get('itemId')!;
      this.itemService.updateItem(id, values).subscribe((changes) => {
        console.log(this.selectedItem, changes.item);
        [...this.selectedItem];
        this.detectChanges.detectChanges();
        console.log(changes);
      });
    } catch (error) {}

    this.router.navigate(['/admin']);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const _id = this.activatedRoute.snapshot.paramMap.get('itemId')!;

    this.itemService.getItem(_id).subscribe((item: Item) => {
      this.selectedItem = item;
      this.detectChanges.detectChanges();
      console.log(this.selectedItem);
    });
  }
}
