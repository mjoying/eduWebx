import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  baseUrl = environment.baseUrl + '/media';
  public archiveList = new Subject;
  constructor(private http: HttpClient) { }


  getArchiveList() {
    this.http.get(this.baseUrl + '/archive/users').subscribe((res: any) => {
      this.archiveList.next();
      this.archiveList.next(res.responseBody);
    });
  }

}
