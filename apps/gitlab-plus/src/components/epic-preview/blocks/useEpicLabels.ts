import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { EpicProvider } from '../../../providers/EpicProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Epic } from '../../../types/Epic';
import { Label } from '../../../types/Label';
import { UpdateStatus } from '../../common/block/useLabelBlock';

export function useEpicLabels(epic: Epic, refetch?: () => Promise<void>) {
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);

  const labels = useMemo(() => {
    return LabelHelper.getLabelsFromWidgets(epic.widgets);
  }, [epic]);

  const onStatusChange = useCallback(
    async (label: Label) => {
      const oldStatus = LabelHelper.getStatusLabel(labels);

      await new EpicProvider().updateEpicLabels(
        epic.id,
        [label.id],
        oldStatus ? [oldStatus.id] : []
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
      LabelHelper.getStatusPrefix()
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
