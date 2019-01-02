import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';

@Injectable()
export class GetItemService {

  constructor(private http : HttpClient) { }

  getItem(id : number) : Promise<Item> {
    let url = "http://localhost:8081/item/" + id;
    let headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken"),
    });
    return this.http.get(url, {headers : headers}).toPromise().
    then(response => JSON.parse(JSON.stringify(response)) as Item);
  }
}
