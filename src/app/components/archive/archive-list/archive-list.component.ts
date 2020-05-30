import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {ArchiveService} from '../archive.service';
import {Archive} from '../../../model/archive';
import {ArchiveVideoComponent} from '../archive-video/archive-video.component';
import {CommonService} from '../../../services/common.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['id', 'userToken.tutor', 'createdDateTime', 'video'];
  dsArchive: MatTableDataSource<Archive>;
  isLoading  =  true;
  interval;
  constructor(private dialog: MatDialog, private userService: UserService,
              private common: CommonService, private translate: TranslateService,
              private archiveService: ArchiveService) {
    this.common.getValue().subscribe((value) => {
      this.translate.use(value);
    });
  }

  ngOnInit() {
    this.archiveService.archiveList.subscribe((data: any) => {
      this.dsArchive = new MatTableDataSource(data);
      this.dsArchive.paginator = this.paginator;
      this.dsArchive.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'userToken.tutor': return item.userToken.tutor.username;
          default: return item[property];
        }
      };
      this.dsArchive.sort = this.sort;
      this.dsArchive.filterPredicate = (datax: any, filter) => {
        const dataStr = JSON.stringify(datax).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
      this.isLoading = false;
    });
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsArchive.filter = filterValue.trim().toLowerCase();
  }

  video(archive: Archive): void {
    const dialogRef = this.dialog.open(ArchiveVideoComponent,
      {maxWidth: '600px', data:  environment.s3Url + '/' + archive.archivePath});
    dialogRef.afterClosed().subscribe(result => {});
  }

}
