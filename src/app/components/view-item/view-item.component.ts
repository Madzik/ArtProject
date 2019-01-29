import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { GetItemService } from '../../services/get-item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  private item : Item = new Item();
  private id : number;

  constructor ( 
            private getItemService : GetItemService,
            private router : Router,
            private route : ActivatedRoute ) { }

  ngOnInit() {
      this.route.params.forEach((params : Params) => {
      this.id = Number.parseInt(params['id']);
    });
    this.getItemService.getItem(this.id).then(
      res => {
        console.log(res);
        this.item = res;
      },
      error => {
        console.log(error);
      });
  }
  goToEdit(item:Item) {
    this.router.navigate(['/edit-item', item.id]).then(
      s => location.reload());
  }
}
