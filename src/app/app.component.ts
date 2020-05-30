import {Component, HostListener} from '@angular/core';
import {CommonService} from './services/common.service';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from './services/user.service';
import {Auth, I18n} from 'aws-amplify';
import {UtilsGeneral} from './utils/UtilsGeneral';
import {dict} from "../assets/i18n/amplify/AuthDict";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: any;
  public imagePath: any;
  public flag: any;
  lang: any;
  constructor(private router: Router, private common: CommonService,
              private translate: TranslateService,
              private userService: UserService) {
    if (UtilsGeneral.getLang() === null) {
      translate.addLangs(['en', 'tr']);
      const browserLang = translate.getBrowserLang();
      this.lang = browserLang.match(/en|tr/) ? browserLang : 'en';
    }
    else {
       this.lang = UtilsGeneral.getLang();
    }
    UtilsGeneral.setLang(this.lang);
    this.changeFlag(this.lang);
    translate.use(this.lang);
    I18n.setLanguage(this.lang);
    I18n.putVocabularies(dict);
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.urlAfterRedirects==='/dashboard') {
          Auth.currentUserInfo().then((user) => {
            this.user = user;
          });
        }
      }
    });

  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    this.common.logOut();
  }
  public changeLanguage(value) {
    UtilsGeneral.setLang(value);
    this.changeFlag(value);
    this.common.setValue(value);
    this.translate.use(value);
    I18n.setLanguage(value);

  }

  private changeFlag(value) {
    if (value==='tr') {
      this.imagePath = 'assets/img/turkey-flag.jpg';
      this.flag = 'Tur';
    }
    if (value==='en') {
      this.imagePath = 'assets/img/us-flag.jpg';
      this.flag = 'Eng';
    }
  }


  logOut() {
    this.userService.saveLogOut().subscribe(
      data => {
        console.log('POST Request is successful');
      }
    );
    Auth.signOut({global: true})
      .then(data => {
        this.user = null;
        UtilsGeneral.removeLogin();
      });
  }
}
