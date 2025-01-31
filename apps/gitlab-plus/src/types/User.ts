import { ApiResponse } from './response';

export type UsersResponse = ApiResponse<{ users: User[] }>;

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: null | string;
  username: string;
  webPath: string;
  webUrl: string;
  __typename: string;
}
