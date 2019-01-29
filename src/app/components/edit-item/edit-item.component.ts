import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AddItemService } from '../../services/add-item.service';
import { EditItemService } from '../../services/edit-item.service';
import { UploadImageService } from '../../services/upload-image.service';
import { GetItemService } from '../../services/get-item.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['../add-item/add-item.component.css']
})
export class EditItemComponent implements OnInit {

  private id : number;
  private item : Item = new Item();
  private itemEdited : boolean;
  private editItemGroup : FormGroup;

  categories : string [] = [ "Painting", "Drawing", "Sculpture", "Ceramics", "Woodwork", "Photography" ];

  constructor(
              private router : Router,
              private route : ActivatedRoute,
              private editService : EditItemService,
              private getItemService : GetItemService,
              private imageService : UploadImageService,
              private fb : FormBuilder) { 
                this.editItemGroup = this.fb.group ({
                  'name' : new FormControl('', Validators.required),
                  'authorName' : new FormControl ('', Validators.required),
                  'authorSurname' : new FormControl ('', Validators.required),
                  'category' : new FormControl ('', Validators.required),
                  'description' : new FormControl ('', Validators.compose
                                ([Validators.required, Validators.maxLength(200)])),
                  'inStockPrice' : new FormControl ('', Validators.compose 
                                ([Validators.required, Validators.min(10), Validators.max(9999)])),
                  'ourPrice' : new FormControl ('', Validators.compose 
                                ([Validators.required, Validators.min(10), Validators.max(9999)])),
                  'weight' : new FormControl ('', Validators.compose
                                ([Validators.required, Validators.min(0.10)])),
                  'available' : new FormControl ('', Validators.required),
                  'inStockNumber' : new FormControl ('', Validators.compose
                                ([Validators.required, Validators.min(1)])),
                });
              }

  ngOnInit() {
    this.route.params.forEach((params : Params) => {
      this.id = Number.parseInt(params['id'])
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

  onSubmit() {
    this.editService.updateItem(this.item).subscribe(
      res => {
        this.imageService.modify(JSON.parse(JSON.stringify(res)).id);
        this.itemEdited = true;
      },
      error => {
        console.log(error);
      });
  }

}
