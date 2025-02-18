import { Epic, LabelWidget } from '../types/Epic';

export class WidgetHelper {
  static epicLabels(epic: Epic) {
    const labelWidgets = epic.widgets.find<LabelWidget>(
      (w): w is LabelWidget => w.type === 'LABELS'
    );

    if (labelWidgets) {
      return labelWidgets.labels.nodes;
    }
    return [];
  }
}
