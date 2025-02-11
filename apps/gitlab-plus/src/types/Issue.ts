import { Iteration } from './Iteration';
import { Label } from './Label';
import { Nodes } from './response';
import { User } from './User';

export type IssueRelation = 'blocks' | 'is_blocked_by' | 'relates_to';

export const issueRelation: IssueRelation[] = [
  'blocks',
  'is_blocked_by',
  'relates_to',
];

export type CreateIssueInput = {
  assigneeIds?: string[];
  iterationCadenceId?: string;
  iterationId?: string;
  labelIds?: (number | string)[];
  milestoneId?: string;
  projectPath: string;
  title: string;
};

export type IssueSetEpicInput = {
  input: {
    hierarchyWidget: {
      parentId: string;
    };
    id: string;
  };
};

export type IssueSetLabelsInput = {
  input: {
    iid: string;
    labelIds: string[];
    projectPath: string;
  };
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
  errors: string[];
  issuable: Issuable;
  __typename: string;
}

export interface Issuable {
  id: string;
  iid: string;
  assignees: Assignees;
  blocked: boolean;
  blockedByCount: number;
  closedAt: string;
  confidential: boolean;
  dueDate: string;
  emailsDisabled: boolean;
  epic: unknown;
  healthStatus: unknown;
  hidden: boolean;
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
  __typename: string;
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
  assignees: Nodes<User>;
  author: User;
  confidential: boolean;
  createdAt: string;
  description: string;
  dueDate: null | string;
  epic: IssueEpic | null;
  iteration: Iteration | null;
  labels: Nodes<Label>;
  milestone: Milestone | null;
  relatedMergeRequests: Nodes<MergeRequest>;
  state: string;
  title: string;
  type: string;
  weight: null | number;
  __typename: string;
}

export interface Milestone {
  id: string;
  dueDate: string;
  startDate: string;
  title: string;
  __typename: string;
}

export interface IssueEpic {
  iid: string;
  title: string;
}

export interface MergeRequest {
  iid: string;
  author: User;
  state: 'closed' | 'locked' | 'merged' | 'opened';
  title: string;
  webUrl: string;
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
  confidential: boolean;
  project: {
    fullPath: string;
  };
  title: string;
  __typename: string;
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
  webUrl: string;
};
