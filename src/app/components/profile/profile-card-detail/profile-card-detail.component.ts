import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {TutorProfile} from '../../../model/tutorProfile';

@Component({
  selector: 'app-profile-card-detail',
  templateUrl: './profile-card-detail.component.html',
  styleUrls: ['./profile-card-detail.component.scss']
})
export class ProfileCardDetailComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public tutorProfile:TutorProfile) {
  }

  ngOnInit() {

  }

}
