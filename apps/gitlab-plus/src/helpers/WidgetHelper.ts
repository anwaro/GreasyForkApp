import { BaseWidget, WidgetOrUnknownWidget, WidgetType } from '../types/Epic';

export class WidgetHelper {
  static getWidget<T extends BaseWidget>(
    widgets: undefined | WidgetOrUnknownWidget<T>[],
    type: WidgetType
  ) {
    return widgets?.find((widget): widget is T => widget.type === type);
  }
}
