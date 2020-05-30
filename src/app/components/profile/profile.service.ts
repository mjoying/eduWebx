import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Accent} from '../../model/accent';
import {LessonLevel} from '../../model/lessonLevel';
import {LessonType} from '../../model/lessonType';
import {Specialization} from '../../model/specialization';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.baseUrl + '/tutors/';
  constructor(private http: HttpClient) { }

  findTutors(status: number, accent: Accent[], lessonLevel: LessonLevel[], lessonType: LessonType[], specialization: Specialization[]) {
    return this.http.post(this.baseUrl + status,      {
      'accents': accent,
      'lessonLevels': lessonLevel,
      'lessonTypes': lessonType,
      'specializations': specialization
    });
  }

  getFavoriteTutors() {
    return this.http.get(this.baseUrl + 'favorite');
  }

  getProfile(id: number) {
    return this.http.get(this.baseUrl + id);
  }
  findTutorByName(name: string) {
    return this.http.get(this.baseUrl + `search/${name}`);
  }
}
