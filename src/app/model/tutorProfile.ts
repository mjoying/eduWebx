import {User} from './user';
import {ListOfValue} from './listOfValue';
import {TutorAccent} from './tutorAccent';
import {TutorLessonLevel} from './tutorLessonLevel';
import {TutorLessonType} from './tutorLessonType';
import {TutorSpecialization} from './tutorSpecialization';

export interface TutorProfile {
  id: number;
  user: User;
  nickName: string;
  native: boolean;
  photoPath: string;
  videoPath: string;
  introduction: string;
  aboutMe: string;
  education: string;
  teachingExperience: string;
  professionalBackground: string;
  country: ListOfValue;
  cityName: string;
  stateName: string;
  tutorAccents: TutorAccent[];
  tutorLessonLevels: TutorLessonLevel[];
  tutorLessonTypes: TutorLessonType[];
  tutorSpecializations: TutorSpecialization[];

}
