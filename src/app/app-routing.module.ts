import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ContentComponent} from './components/content/content.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {FaqsComponent} from './components/faqs/faqs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path : '' ,  component: ContentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'subscriptions', component: SubscriptionsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
