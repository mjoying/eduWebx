import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import {MaterialModule} from './app-material/material.module';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ContentComponent } from './components/content/content.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import {StyleService} from "./services/style.service";
import { MissionComponent } from './components/mission/mission.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ProfileCardDetailComponent } from './components/profile/profile-card-detail/profile-card-detail.component';
import { ProfileCardComponent } from './components/profile/profile-card/profile-card.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpModule } from '@angular/http';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
    ContentComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    FaqsComponent,
    MissionComponent,
    TeachersComponent,
    FeedbackComponent,
    ProfileCardDetailComponent,
    ProfileCardComponent,
    SubscriptionsComponent,
    CheckoutComponent
  ],
  imports: [
    AmplifyAngularModule,
    AppRoutingModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    Ng5SliderModule,
    
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AmplifyService
    ,
    StyleService
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule loaded.');
  }
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/app/', '.json');
}
