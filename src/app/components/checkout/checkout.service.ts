import { Observable } from "rxjs/Observable";
import { Http ,Headers} from "@angular/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = "http://dummy.restapiexample.com/api/v1/create";
  constructor(private http: Http) { }

  checkOut(request:any):Observable<any> {
     return this.http.post(this.baseUrl , request).map((response) => {
      let result: any = response.json();
      return result;
  });
  }
}
