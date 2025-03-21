import { WidgetType } from './Epic';
import { Label } from './Label';
import { Nodes } from './response';

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
    widgets: WidgetOrUnknownWidget<LabelWidget>[];
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

export type WidgetOrUnknownWidget<T extends BaseWidget> = BaseWidget | T;
