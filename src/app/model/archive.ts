import {UserToken} from './userToken';

export interface Archive {
  id: number;
  userToken: UserToken;
  archivePath: string;
  createdDateTime: Date;
}
