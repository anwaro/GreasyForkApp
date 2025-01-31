import { ApiResponse, Nodes } from './response';

export type MilestonesResponse = ApiResponse<{ attributes: Nodes<Milestone> }>;

export interface Milestone {
  id: string;
  iid: string;
  dueDate?: string;
  expired: boolean;
  state: string;
  title: string;
  webUrl: string;
  __typename: string;
}
