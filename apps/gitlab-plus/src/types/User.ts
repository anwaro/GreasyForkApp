import { ApiResponseWorkspace } from './response';

export type UsersResponse = ApiResponseWorkspace<{ users: User[] }>;
export type CurrentUsersResponse = { data: { currentUser: User } };

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: null | string;
  username: string;
  webPath: string;
  webUrl: string;
}
