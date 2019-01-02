import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GetItemListService {

  constructor(private http : HttpClient) { }

  getItemList() : Promise<Item[]> {
    const url = "http://localhost:8081/item/itemList";
    const headers = new HttpHeaders ({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken'),
    });
    return this.http.get(url, {headers : headers}).toPromise().
    then(response => JSON.parse(JSON.stringify(response)) as Item[]);
  }

}
