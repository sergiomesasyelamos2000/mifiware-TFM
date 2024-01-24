import { Role } from '../enums';

export interface IAuthState {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  name?: string;
  surname?: string;
  email?: string;
  role?: Role;
}
