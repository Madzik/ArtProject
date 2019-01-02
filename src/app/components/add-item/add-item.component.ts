import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AddItemService } from '../../services/add-item.service';
import { UploadImageService } from '../../services/upload-image.service';

export class FormErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control : FormControl | null, form : FormGroupDirective | NgForm | null ) : boolean {
    const isSubmitted = form && form.submitted;
    //const controlTouched = control && (control.touched || control.dirty);
   // const controlInvalid = control && control.invalid;
   // const parentInvalid = control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched);
    return !!(control && control.invalid && (control.touched || control.dirty || isSubmitted));
    //return !! (isSubmitted || (controlTouched && (controlInvalid || parentInvalid)));
  }
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  private addItemGroup : FormGroup;
  private item : Item = new Item();
  private itemAdded : boolean;
  errorMatcher = new FormErrorStateMatcher();

  // this can go to constants
  categories : string [] = [ "Painting", "Drawing", "Sculpture", "Ceramics", "Woodwork", "Photography" ];

  constructor (
    private fb: FormBuilder, 
    private router : Router,
    private addItemService : AddItemService,
    private imageService : UploadImageService) {
    this.addItemGroup = this.fb.group ({
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
    })
  }

  ngOnInit() {
    this.itemAdded = false;
  }

  onSubmit() {
    this.addItemService.addItem(this.item).subscribe(
      res => {
        this.imageService.upload(JSON.parse(JSON.stringify(res)).id);
        this.itemAdded = true;
        this.item = new Item();
      },
      error => {
        console.log(error);
      }
    )
  }
}
