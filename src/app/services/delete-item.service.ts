import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DeleteItemService {

  constructor(private http:HttpClient) { }

  deleteItem(itemId : number) {
    let url = "http://localhost:8081/item/delete/" +itemId;
    let headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'x-auth-token' : localStorage.getItem("xAuthToken"),
    });
    return this.http.post(url, {headers : headers});
  }

}
