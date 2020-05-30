import {Component, OnInit, OnDestroy} from '@angular/core';
import {Auth, Hub} from 'aws-amplify';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {StyleService} from "../../services/style.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsGeneral} from "../../utils/UtilsGeneral";


@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
   signUpConfig = {
     hiddenDefaults: ['phone_number'],
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        placeholder: 'Username',
        type: 'username',
        displayOrder: 1,
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        placeholder: 'Email',
        type: 'email',
        displayOrder: 2
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        placeholder: 'Password',
        type: 'password',
        displayOrder: 3
      }
    ]
  };

  constructor(private userService: UserService,private translate: TranslateService,
              private router: Router, private styleService: StyleService) {
    localStorage.clear();
    UtilsGeneral.removeLogin();
  }


  ngOnInit() {
    this.styleService.setStyle('amplify1', 'assets/amplify/Theme.css');
    this.styleService.setStyle('amplify2', 'assets/amplify/Angular.css');
    this.styleService.setStyle('amplify3', 'assets/amplify/style.css');
    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          this.saveUser();
          break;
        case 'signUp':
          console.log('now the user signed up');
          break;
        case 'signOut':
          console.log('now the user is signed out');
          break;
        case 'signIn_failure':
          console.log('now the user is sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');

      }
    };
    Hub.listen('auth', listener);
  }

  saveUser() {
    Auth.currentUserInfo()
      .then(res => {
        UtilsGeneral.setLogin();
        this.userService.saveUserLogIn().subscribe(
          data => {
            console.log('POST Request is successful ', data);
            return this.router.navigate(['/dashboard']);
          }
        );
      });
  }

  ngOnDestroy() {
    this.styleService.removeStyle('amplify1');
    this.styleService.removeStyle('amplify2');
    this.styleService.removeStyle('amplify3');
  }
}
