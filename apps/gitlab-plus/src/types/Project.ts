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
  avatarUrl: string;
  fullPath: string;
  nameWithNamespace: string;
  archived: boolean;
  __typename: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  __typename: string;
}
