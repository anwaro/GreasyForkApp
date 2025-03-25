import { ApiResponseWorkspace } from './response';
import { User } from './User';
import { HierarchyWidget, LabelWidget, WidgetOrUnknownWidget } from './Widget';

export type EpicResponse = ApiResponseWorkspace<{ workItem: Epic }>;

export enum WidgetType {
  hierarchy = 'HIERARCHY',
  label = 'LABELS',
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

export type EpicWidget = WidgetOrUnknownWidget<HierarchyWidget | LabelWidget>;

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
