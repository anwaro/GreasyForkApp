import { ApiResponse, Nodes } from './response';

export type MilestonesResponse = ApiResponse<{ attributes: Nodes<Milestone> }>;

export interface Milestone {
  id: string;
  iid: string;
  title: string;
  webUrl: string;
  dueDate?: string;
  expired: boolean;
  __typename: string;
  state: string;
}
