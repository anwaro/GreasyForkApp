import { User } from './User';
import { Label } from './Label';
import { Nodes } from './response';
import { Iteration } from './Iteration';

export interface CreateIssueResponse {
  data: IssueData;
}

export interface IssueData {
  createIssuable: CreateIssuable;
}

export interface CreateIssuable {
  issuable: Issuable;
  errors: string[];
  __typename: string;
}

export interface Issuable {
  id: string;
  iid: string;
  title: string;
  referencePath: string;
  closedAt: string;
  dueDate: string;
  timeEstimate: number;
  totalTimeSpent: number;
  humanTimeEstimate: number;
  humanTotalTimeSpent: number;
  emailsDisabled: boolean;
  confidential: boolean;
  hidden: boolean;
  webUrl: string;
  relativePosition: number;
  type: string;
  severity: string;
  projectId: string;
  milestone: unknown;
  assignees: Assignees;
  labels: Labels;
  __typename: string;
  weight: unknown;
  blocked: boolean;
  blockedByCount: number;
  epic: unknown;
  iteration: unknown;
  healthStatus: unknown;
}

export interface Assignees {
  nodes: User[];
  __typename: string;
}

export interface Labels {
  nodes: Label[];
  __typename: string;
}

export interface IssueResponse {
  data: ProjectData;
}

export interface ProjectData {
  project: Project;
}

export interface Project {
  id: string;
  issue: Issue;
  __typename: string;
}

export interface Issue {
  id: string;
  iid: string;
  title: string;
  description: string;
  createdAt: string;
  state: string;
  confidential: boolean;
  dueDate: string | null;
  milestone: Milestone | null;
  labels: Nodes<Label>;
  assignees: Nodes<User>;
  relatedMergeRequests: Nodes<MergeRequest>;
  iteration: Iteration | null;
  weight: number | null;
  type: string;
  __typename: string;
}

export interface Milestone {
  id: string;
  title: string;
  startDate: string;
  dueDate: string;
  __typename: string;
}

export interface MergeRequest {
  iid: string;
  title: string;
  state: 'merged' | 'opened' | 'closed' | 'locked';
  author: User;
}

export interface IssuesResponse {
  data: IssuesResponseData;
}

export interface IssuesResponseData {
  workspace: IssuesResponseWorkspace;
}

export interface IssuesResponseWorkspace {
  id: string;
  workItems: WorkItems;
  workItemsByIid: WorkItems;
  workItemsEmpty: WorkItems;
  __typename: string;
}

export interface WorkItems {
  nodes: IssueAutocomplete[];
  __typename: string;
}

export interface IssueAutocomplete {
  id: string;
  iid: string;
  title: string;
  confidential: boolean;
  project: {
    fullPath: string;
  };
  __typename: string;
}
