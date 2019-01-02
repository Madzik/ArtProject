import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Router } from '@angular/router';
import { GetItemListService } from '../../services/get-item-list.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  private items : Item [];
  private removedItems : Item [];
  private selectedItem : Item;

  constructor(
      private getListService : GetItemListService,
      private router : Router  
  ) { }

  ngOnInit() {
    this.items = [];
    this.getListService.getItemList().then(
      res => {
        console.log(JSON.stringify(res));
        this.items = res;
      },
      error => {
        console.log(error);
      },
    );
  }

  onSelect (item:Item) {
    this.selectedItem = item;
    //this.router.navigate(['/view-item/', item.id]);
    this.router.navigate(['/view-item/',item.id]);
  }

}
