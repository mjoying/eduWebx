import {User} from './user';

export interface UserToken {
  id: number;
  status: number;
  sessionId: string;
  token: string;
  apiKey: string;
  createdDateTime: Date;
  updatedDateTime: Date;
  tutor: User;
}
