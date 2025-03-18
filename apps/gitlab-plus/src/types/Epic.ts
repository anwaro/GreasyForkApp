import { Label } from './Label';
import { ApiResponseWorkspace, Nodes } from './response';
import { User } from './User';

export type EpicResponse = ApiResponseWorkspace<{ workItem: Epic }>;

export enum WidgetType {
  label = 'LABELS',
  hierarchy = 'HIERARCHY',
}

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

export type EpicWidget = HierarchyWidget | LabelWidget | BaseWidget;

export type LabelWidget = {
  labels: Nodes<Label>;
  type: WidgetType.label;
};

export type HierarchyWidget = {
  children: {
    count: number;
  } & Nodes<{
    id: string;
    iid: string;
    widgets: (LabelWidget | BaseWidget)[];
    state: string;
    title: string;
    webUrl: string;
  }>;
  hasChildren: boolean;
  type: WidgetType.hierarchy;
};

export type BaseWidget = {
  type: WidgetType;
};

export type WidgetOrUnknownWidget<T extends BaseWidget> = T | BaseWidget;

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
