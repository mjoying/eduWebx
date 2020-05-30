import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {BehaviorSubject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {UtilsGeneral} from "../utils/UtilsGeneral";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private langInfo: BehaviorSubject<string>;
  constructor(private http: HttpClient, private router: Router,  private translate: TranslateService,
              private userService: UserService) {
    const browserLang = translate.getBrowserLang();
    this.langInfo = new BehaviorSubject<string>(browserLang);
  }

  logOut() {
        this.userService.saveLogOut().subscribe(
          data => {
            console.log('POST Request is successful');
          }
        );
        Auth.signOut({global: true})
          .then(data => {
            UtilsGeneral.removeLogin();
          });
  }
  getValue(): Observable<string> {
    return this.langInfo.asObservable();
  }
  setValue(newValue): void {
    this.langInfo.next(newValue);
  }
}
