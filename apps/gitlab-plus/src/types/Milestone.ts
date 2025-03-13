import { ApiResponseWorkspace, Nodes } from './response';

export type MilestonesResponse = ApiResponseWorkspace<{
  attributes: Nodes<Milestone>;
}>;

export interface Milestone {
  id: string;
  iid: string;
  dueDate?: string;
  expired: boolean;
  state: string;
  title: string;
  webUrl: string;
}
