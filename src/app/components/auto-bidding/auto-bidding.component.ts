import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/data/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auto-bidding',
  templateUrl: './auto-bidding.component.html',
  styleUrls: ['./auto-bidding.component.css'],
})
export class AutoBiddingComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getItem()
  }

  selectedItem?: Item;

  getItem(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.itemService
      .getItem(id)
      .subscribe((item) => (this.selectedItem = item));
  }
}
