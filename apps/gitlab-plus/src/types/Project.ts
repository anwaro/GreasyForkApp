export interface ProjectsResponse {
  data: Data;
}

export interface Data {
  group: Group;
}

export interface Group {
  id: string;
  projects: Projects;
  __typename: string;
}

export interface Projects {
  nodes: Project[];
  pageInfo: PageInfo;
  __typename: string;
}

export interface Project {
  id: string;
  name: string;
  archived: boolean;
  avatarUrl: string;
  fullPath: string;
  nameWithNamespace: string;
  __typename: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  __typename: string;
}
