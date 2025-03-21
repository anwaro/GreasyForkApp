import { WidgetType } from '../types/Epic';
import { BaseWidget, WidgetOrUnknownWidget } from '../types/Widget';

export class WidgetHelper {
  static getWidget<T extends BaseWidget>(
    widgets: undefined | WidgetOrUnknownWidget<T>[],
    type: WidgetType
  ) {
    return widgets?.find((widget): widget is T => widget.type === type);
  }
}
