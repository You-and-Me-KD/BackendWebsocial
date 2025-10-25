import { USER_ROLE } from 'apps/users/src/enums';

export interface TokenPayload {
  id: string;
  email: string;
  role: USER_ROLE;
}
