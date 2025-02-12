import { Label } from './Label';
import { ApiResponseWorkspace } from './response';
import { User } from './User';

export type MrResponse = ApiResponseWorkspace<{ mergeRequest: MergeRequest }>;

export interface MergeRequest {
  id: string;
  iid: string;
  approvedBy: ApprovedBy;
  assignees: Assignees;
  author: User;
  commitCount: number;
  conflicts: boolean;
  createdAt: string;
  diffStatsSummary: DiffStatsSummary;
  draft: boolean;
  labels: Labels;
  mergeable: boolean;
  resolvableDiscussionsCount: number;
  resolvedDiscussionsCount: number;
  reviewers: Reviewers;
  shouldBeRebased: boolean;
  sourceBranch: string;
  state: 'closed' | 'locked' | 'merged' | 'opened';
  targetBranch: string;
  title: string;
  titleHtml: string;
  webUrl: string;
}

export interface Assignees {
  nodes: User[];
}

export interface ApprovedBy {
  nodes: User[];
}

export interface DiffStatsSummary {
  additions: number;
  changes: number;
  deletions: number;
  fileCount: number;
}

export interface Labels {
  nodes: Label[];
}

export interface Reviewers {
  nodes: User[];
}
