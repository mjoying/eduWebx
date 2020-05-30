import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchiveVideoComponent} from './archive-video/archive-video.component';
import {ArchiveListComponent} from './archive-list/archive-list.component';
import {ArchiveRoutingModule} from './archive-routing.module';
import {MaterialModule} from '../../app-material/material.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [ArchiveVideoComponent, ArchiveListComponent],
    imports: [
        CommonModule,
        ArchiveRoutingModule,
        MaterialModule,
        TranslateModule
    ],
    exports: [
        ArchiveListComponent
    ],
    entryComponents: [
        ArchiveVideoComponent
    ]
})
export class ArchiveModule {constructor() {
  console.log('Archive loaded.');
}}
