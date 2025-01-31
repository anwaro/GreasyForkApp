import { Label } from './Label';
import { ApiResponse, Nodes } from './response';

export type EpicResponse = ApiResponse<{ workItem: Epic }>;

export interface Epic {
  id: string;
  iid: string;
  archived: boolean;
  author: Author;
  closedAt: any;
  confidential: boolean;
  createdAt: string;
  createNoteEmail: any;
  description: string;
  namespace: Namespace;
  project: any;
  reference: string;
  state: string;
  title: string;
  userPermissions: UserPermissions;
  webUrl: string;
  widgets: EpicWidget[];
  workItemType: WorkItemType;
  __typename: string;
}

export interface Namespace {
  id: string;
  name: string;
  fullName: string;
  fullPath: string;
  __typename: string;
}

export type EpicWidget = LabelWidget | UnknownWidget;

export type LabelWidget = {
  labels: Nodes<Label>;
  type: 'LABELS';
};
export type UnknownWidget = {
  type: string;
};

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  username: string;
  webPath: string;
  webUrl: string;
  __typename: string;
}

export interface WorkItemType {
  id: string;
  name: string;
  iconName: string;
  __typename: string;
}

export interface UserPermissions {
  adminParentLink: boolean;
  adminWorkItemLink: boolean;
  createNote: boolean;
  deleteWorkItem: boolean;
  markNoteAsInternal: boolean;
  reportSpam: boolean;
  setWorkItemMetadata: boolean;
  updateWorkItem: boolean;
  __typename: string;
}

export interface Labels {
  nodes: Node[];
  __typename: string;
}

export interface Node {
  id: string;
  color: string;
  description: string;
  textColor: string;
  title: string;
  __typename: string;
}

export interface LinkedItems {
  nodes: any[];
  __typename: string;
}

export interface CurrentUserTodos {
  nodes: any[];
  __typename: string;
}

export interface WidgetDefinition {
  editable: boolean;
  rollUp: boolean;
  __typename: string;
}

export interface Timelogs {
  nodes: any[];
  __typename: string;
}
