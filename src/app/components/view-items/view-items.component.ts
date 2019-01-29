import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Router } from '@angular/router';
import { GetItemListService } from '../../services/get-item-list.service';
import { DeleteItemService } from '../../services/delete-item.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DeleteItemDialogComponent } from '../delete-item-dialog/delete-item-dialog.component';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  private items : Item [];
  private removedItems : Item [] = new Array();
  private selectedItem : Item;
  private checked : boolean;
  private allChecked : boolean;

  constructor(
      private getListService : GetItemListService,
      private deleteItemService : DeleteItemService,
      public dialog : MatDialog,
      private router : Router  
  ) { }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
   // this.items = [];
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

  onSelect(item:Item) {
    this.selectedItem = item;
    this.router.navigate(['/view-item/',item.id]);
  }

  openDialog(item:Item) {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
      data : {
        item : item
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result)
        if(result) {         
          this.deleteItemService.deleteItem(item.id).subscribe(
            res => {
              console.log(res);
              this.getItems();
            },
            error => {
              console.log(error);
          }); 
        }
      });
  }

  updateRemovedItems(checked:boolean, item:Item ){
    if(checked) {
      this.removedItems.push(item);
    } 
    else {
      this.removedItems.splice(this.removedItems.indexOf(item), 1);
    }
  }

  updateSelected(checked:boolean) {
    if(checked) {
      this.allChecked = true;
      this.removedItems = this.items.slice();
    }
    else {
      this.allChecked = false;
      this.removedItems = [];
    }
  }

  removeSelectedItems() {

    for(let removedItem of this.removedItems) {

    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
      data : {
        item : removedItem
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result)
        if(result) { 
          
            this.deleteItemService.deleteItem(removedItem.id).subscribe(
              res => {
                console.log(res);
                this.getItems();
              },
              error => {
                console.log(error);
            }); 
          }       
      });
    } 
    this.removedItems = [];
  }

}
