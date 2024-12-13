import { Iteration } from './Iteration';
import { Label } from './Label';
import { Nodes } from './response';
import { User } from './User';

export type IssueRelation = 'blocks' | 'is_blocked_by' | 'relates_to';

export const issueRelation: IssueRelation[] = ['blocks', 'is_blocked_by', 'relates_to']

export type CreateIssueInput = {
  assigneeIds?: string[];
  iterationCadenceId?: string;
  iterationId?: string;
  labelIds?: (number | string)[];
  milestoneId?: string;
  projectPath: string;
  title: string;
};

export type CreateIssueLinkInput = {
  targetIssueIid: string;
  issueId: number | string;
  linkType: IssueRelation;
  projectId: number | string;
  targetProjectId: string;
};

export interface CreateIssueResponse {
  data: IssueData;
}

export interface IssueData {
  createIssuable: CreateIssuable;
}

export interface CreateIssuable {
  __typename: string;
  errors: string[];
  issuable: Issuable;
}

export interface Issuable {
  confidential: boolean;
  hidden: boolean;
  id: string;
  iid: string;
  __typename: string;
  assignees: Assignees;
  blocked: boolean;
  blockedByCount: number;
  closedAt: string;
  dueDate: string;
  emailsDisabled: boolean;
  epic: unknown;
  healthStatus: unknown;
  humanTimeEstimate: number;
  humanTotalTimeSpent: number;
  iteration: unknown;
  labels: Labels;
  milestone: unknown;
  projectId: string;
  referencePath: string;
  relativePosition: number;
  severity: string;
  timeEstimate: number;
  title: string;
  totalTimeSpent: number;
  type: string;
  webUrl: string;
  weight: unknown;
}

export interface Assignees {
  __typename: string;
  nodes: User[];
}

export interface Labels {
  __typename: string;
  nodes: Label[];
}

export interface IssueResponse {
  data: ProjectData;
}

export interface ProjectData {
  project: Project;
}

export interface Project {
  id: string;
  __typename: string;
  issue: Issue;
}

export interface Issue {
  confidential: boolean;
  id: string;
  iid: string;
  __typename: string;
  assignees: Nodes<User>;
  createdAt: string;
  description: string;
  dueDate: null | string;
  iteration: Iteration | null;
  labels: Nodes<Label>;
  milestone: Milestone | null;
  relatedMergeRequests: Nodes<MergeRequest>;
  state: string;
  title: string;
  type: string;
  weight: null | number;
}

export interface Milestone {
  id: string;
  __typename: string;
  dueDate: string;
  startDate: string;
  title: string;
}

export interface MergeRequest {
  iid: string;
  author: User;
  state: 'closed' | 'locked' | 'merged' | 'opened';
  title: string;
}

export interface IssuesResponse {
  data: IssuesResponseData;
}

export interface IssuesResponseData {
  workspace: IssuesResponseWorkspace;
}

export interface IssuesResponseWorkspace {
  id: string;
  workItemsByIid: WorkItems;
  __typename: string;
  workItems: WorkItems;
  workItemsEmpty: WorkItems;
}

export interface WorkItems {
  __typename: string;
  nodes: IssueAutocomplete[];
}

export interface IssueAutocomplete {
  confidential: boolean;
  id: string;
  iid: string;
  __typename: string;
  project: {
    fullPath: string;
  };
  title: string;
}

export type RelatedIssue = {
  id: number;
  iid: number;
  author: User;
  closedAt: string;
  closedBy: string;
  createdAt: string;
  description: string;
  linkType: IssueRelation;
  projectId: number;
  state: string;
  title: string;
  updatedAt: string;
};

export type IssueWithRelated = Issue & { relatedIssues: RelatedIssue[] };
