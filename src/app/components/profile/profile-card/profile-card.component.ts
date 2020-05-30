import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProfileCardDetailComponent} from '../profile-card-detail/profile-card-detail.component';
import {TutorProfile} from '../../../model/tutorProfile';
import {TutorStatus} from '../../../model/tutorStatus';
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: TutorProfile;
  get tutorStatus() { return TutorStatus; }
  constructor(public dialog: MatDialog,private profileService: ProfileService) {
  }
  ngOnInit() {
  }

  profileDetail(): void {
    this.profileService.getProfile(this.profile.id).subscribe((res: any) => {
      const dialogRef = this.dialog.open(ProfileCardDetailComponent,
        {maxWidth: '600px', maxHeight:'800px', data: res.responseBody[0]});
      dialogRef.afterClosed().subscribe(result => {});
    });
  }
  conversation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {profile: this.profile};
  }
}
