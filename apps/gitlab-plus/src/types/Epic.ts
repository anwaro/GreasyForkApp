import { Label } from './Label';
import { ApiResponseWorkspace, Nodes } from './response';
import { User } from './User';

export type EpicResponse = ApiResponseWorkspace<{ workItem: Epic }>;

export interface Epic {
  id: string;
  iid: string;
  archived: boolean;
  author: User;
  closedAt: string;
  createdAt: string;
  description: string;
  namespace: Namespace;
  project: { id: string };
  reference: string;
  state: string;
  title: string;
  userPermissions: UserPermissions;
  webUrl: string;
  widgets: EpicWidget[];
}

export type EpicSetLabelsInput = {
  input: {
    id: string;
    labelsWidget: {
      addLabelIds: string[];
      removeLabelIds: string[];
    };
  };
};

export interface Namespace {
  id: string;
  name: string;
  fullName: string;
  fullPath: string;
}

export type EpicWidget = HierarchyWidget | LabelWidget | UnknownWidget;

export type LabelWidget = {
  labels: Nodes<Label>;
  type: 'LABELS';
};

export type HierarchyWidget = {
  children: {
    count: number;
  } & Nodes<{
    id: string;
    iid: string;
    widgets: (LabelWidget | UnknownWidget)[];
    state: string;
    title: string;
    webUrl: string;
  }>;
  hasChildren: boolean;
  type: 'HIERARCHY';
};

export type UnknownWidget = {
  type: string;
};

export interface WorkItemType {
  id: string;
  name: string;
  iconName: string;
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
}

export interface Labels {
  nodes: Node[];
}

export interface Node {
  id: string;
  color: string;
  description: string;
  textColor: string;
  title: string;
}
