import { Iteration } from './Iteration';
import { Label } from './Label';
import { ApiResponseProject, Nodes } from './response';
import { User } from './User';
import { LabelWidget, WidgetOrUnknownWidget } from './Widget';

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

export type IssueSetAssigneesInput = {
  input: {
    iid: string;
    assigneeUsernames: string[];
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
  createIssue: CreateIssue;
}

export interface CreateIssue {
  errors: string[];
  issue: CreatedIssue;
}

export interface CreatedIssue {
  id: string;
  iid: string;
  projectId: string;
}

export type IssueResponse = ApiResponseProject<{ issue: Issue }>;

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
  linkedWorkItems: Nodes<RelatedIssue>;
  milestone: Milestone | null;
  projectId: string;
  relatedMergeRequests: Nodes<MergeRequest>;
  state: string;
  title: string;
  type: string;
  webUrl: string;
  weight: null | number;
}

export type IssueWithIssuesLabelsResponse = ApiResponseProject<{
  issue: IssueWithIssuesLabels;
}>;

export interface IssueWithIssuesLabels {
  linkedWorkItems: Nodes<RelatedIssueWithLabels>;
}

export interface Milestone {
  id: string;
  dueDate: string;
  startDate: string;
  title: string;
}

export interface IssueEpic {
  id: string;
  iid: string;
  labels: Nodes<Label>;
  title: string;
  webUrl: string;
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
}

export interface WorkItems {
  nodes: IssueAutocomplete[];
}

export interface IssueAutocomplete {
  id: string;
  iid: string;
  project: {
    fullPath: string;
  };
  title: string;
}

export type RelatedIssue = {
  linkType: IssueRelation;
  workItem: {
    id: string;
    iid: string;
    widgets: WidgetOrUnknownWidget<LabelWidget>[];
    title: string;
    webUrl: string;
  };
  workItemState: string;
};

export type RelatedIssueWithLabels = {
  workItem: {
    id: string;
    iid: string;
    widgets: WidgetOrUnknownWidget<LabelWidget>[];
  };
};
