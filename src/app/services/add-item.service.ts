import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';

@Injectable()
export class AddItemService {



  constructor (private http: HttpClient) { }

  addItem (item : Item) {
    let url = "http://localhost:8081/item/add";
    let headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'x-auth-token' : localStorage.getItem("xAuthToken"),
    });
    return this.http.post(url, JSON.stringify(item), {headers : headers});
  }

}
