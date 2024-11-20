import { ApiResponse } from './response';

export type UsersResponse = ApiResponse<{ users: User[] }>;

export interface User {
  id: string;
  avatarUrl: string;
  name: string;
  username: string;
  webUrl: string;
  webPath: string;
  __typename: string;
  status: string | null;
}
