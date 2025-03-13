import { ApiResponseWorkspace, Nodes } from './response';

export type ProjectsResponse = ApiResponseWorkspace<{
  projects: Nodes<Project>;
}>;
 
export interface Project {
  id: string;
  name: string;
  archived: boolean;
  avatarUrl: string;
  fullPath: string;
  nameWithNamespace: string;
}
