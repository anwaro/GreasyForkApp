import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { EpicProvider } from '../../../providers/EpicProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Epic, LabelWidget } from '../../../types/Epic';
import { Label } from '../../../types/Label';
import { UpdateStatus } from '../../common/block/useLabelBlock';
import { UserConfig } from '../../user-settings/UserConfig';
import { userSettingsStore } from '../../user-settings/UserSettingsStore';

export function useEpicLabels(epic: Epic, refetch?: () => Promise<void>) {
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);

  const labels = useMemo(() => {
    const labelWidget = epic.widgets.find(
      (widget): widget is LabelWidget => widget.type === 'LABELS'
    );
    if (labelWidget) {
      return labelWidget.labels.nodes;
    }
    return [];
  }, [epic]);

  const onStatusChange = useCallback(
    async (label: Label) => {
      const oldStatus = labels.filter((l) =>
        l.title.includes(
          userSettingsStore.getConfig(UserConfig.StatusLabelPrefix)
        )
      );

      await new EpicProvider().updateEpicLabels(
        epic.id,
        [label.id],
        oldStatus.map((l) => l.id)
      );

      if (refetch) {
        await refetch();
      }
    },
    [labels]
  );

  const fetchLabels = useCallback(async (workspacePath: string) => {
    const response = await new LabelsProvider().getWorkspaceLabels(
      workspacePath,
      userSettingsStore.getConfig(UserConfig.StatusLabelPrefix)
    );
    setStatusLabels(response.data.workspace.labels.nodes);
  }, []);

  useEffect(() => {
    fetchLabels(epic.namespace.fullPath);
  }, []);

  return {
    labels,
    updateStatus: {
      labels: statusLabels,
      update: onStatusChange,
    } satisfies UpdateStatus,
  };
}
