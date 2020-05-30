import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl + '/users';
  constructor(private http: HttpClient) { }

  saveUserLogIn() {
    return this.http.post(this.baseUrl + '/saveUserLogIn', null);
  }

  saveLogOut() {
    return this.http.post(this.baseUrl + '/saveLogOut', null);
  }

  getUserLog() {
    return this.http.get(this.baseUrl + '/userLog/list');
  }

  updateStatus(status: number) {
    return this.http.put(this.baseUrl +  `/${status}`, null);
  }

}
