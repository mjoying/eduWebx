import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {MatCardModule} from '@angular/material';
import {MaterialModule} from '../../app-material/material.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MaterialModule,
    TranslateModule
  ]
})
export class ProfileModule {
  constructor() {
    console.log('ProfileModule loaded.');
  }
}
