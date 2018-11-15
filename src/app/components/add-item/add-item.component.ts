import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  private addItemGroup : FormGroup;
  private item : Item = new Item();
  private itemAdded : boolean;

  categories : string [] = [ "Painting", "Drawing", "Sculpture", "Ceramics", "Woodwork", "Photography" ];

  constructor( private fb: FormBuilder, 
    private router : Router) {
    this.addItemGroup = this.fb.group ({
      'name' : new FormControl('', Validators.required),
      'authorName' : new FormControl ('', Validators.required),
      'authorSurname' : new FormControl ('', Validators.required),
      'category' : new FormControl ('', Validators.required),
      'description' : new FormControl ('', Validators.required),
      'inStockPrice' : new FormControl ('', Validators.compose 
                    ([Validators.required, Validators.minLength(2), Validators.maxLength(5)])),
      'ourPrice' : new FormControl ('', Validators.compose 
                    ([Validators.required, Validators.minLength(2), Validators.maxLength(5)])),
      'weight' : new FormControl ('', Validators.required),
      'inStockNumber' : new FormControl ('', Validators.required),
    })
  }

  ngOnInit() {
  }

}
