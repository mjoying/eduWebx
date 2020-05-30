import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-archive-video',
  templateUrl: './archive-video.component.html',
  styleUrls: ['./archive-video.component.scss']
})
export class ArchiveVideoComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
