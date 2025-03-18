import { UserConfig } from '../components/user-settings/UserConfig';
import { userSettingsStore } from '../components/user-settings/UserSettingsStore';
import { LabelWidget, WidgetOrUnknownWidget, WidgetType } from '../types/Epic';
import { Label } from '../types/Label';
import { WidgetHelper } from './WidgetHelper';

export class LabelHelper {
  static getLabelsFromWidgets(widgets?: WidgetOrUnknownWidget<LabelWidget>[]) {
    return LabelHelper.getLabelWidget(widgets)?.labels.nodes || [];
  }

  static getLabelWidget(widgets?: WidgetOrUnknownWidget<LabelWidget>[]) {
    return WidgetHelper.getWidget(widgets, WidgetType.label);
  }

  static getStatusLabel(labels?: Label[]) {
    return labels?.find((label) =>
      label.title.startsWith(LabelHelper.getStatusPrefix())
    );
  }

  static getStatusLabelFromWidgets(
    widgets?: WidgetOrUnknownWidget<LabelWidget>[]
  ) {
    return LabelHelper.getStatusLabel(
      LabelHelper.getLabelsFromWidgets(widgets)
    );
  }

  static getStatusPrefix() {
    return userSettingsStore.getConfig(UserConfig.StatusLabelPrefix);
  }
}
