import { Role } from '../enums';

export interface IUserState {
  uuid?: string;
  name?: string;
  surname?: string;
  email?: string;
  role?: Role;
  photoUrl?: string;
}
