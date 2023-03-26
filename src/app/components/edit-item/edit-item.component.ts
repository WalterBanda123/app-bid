import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/data/item';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router:Router
  ) {}

  selectedItem: any;

  updatedItem(newchanges: NgForm) {
    console.log('Item updated', newchanges.valueChanges);
    this.router.navigate(['/admin'])
  }

  ngOnInit(): void {
    const _id = this.activatedRoute.snapshot.paramMap.get('itemId')!;

    this.itemService.getItem(_id).subscribe((item: Item) => {
      this.selectedItem = item;
      console.log(this.selectedItem);
    });
  }
}
