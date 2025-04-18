import { useCallback, useMemo } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { GitlabEpicLink } from '../../../helpers/LinkParser';
import { EpicProvider } from '../../../providers/EpicProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Epic } from '../../../types/Epic';
import { Label } from '../../../types/Label';
import { UpdateLabelStatus } from '../block/LabelsBlock';

type Props = {
  epic?: Epic;
  link: GitlabEpicLink;
  refetch?: () => Promise<void>;
};

export function useEpicLabels({ epic, link, refetch }: Props) {
  const { labels, statusLabel } = useMemo(() => {
    const labels = LabelHelper.getLabelsFromWidgets(epic?.widgets);
    return {
      labels,
      statusLabel: LabelHelper.getStatusLabel(labels),
    };
  }, [epic]);

  const onStatusChange = useCallback(
    async (label: Label) => {
      if (!epic) {
        return;
      }

      await new EpicProvider().updateEpicLabels(
        epic.id,
        [label.id],
        statusLabel ? [statusLabel.id] : []
      );

      if (refetch) {
        await refetch();
      }
    },
    [labels, statusLabel]
  );

  const fetchStatusLabels = useCallback(async () => {
    const response = await new LabelsProvider().getWorkspaceLabels(
      link.workspacePath,
      LabelHelper.getStatusPrefix()
    );
    return response.data.workspace.labels.nodes;
  }, []);

  return {
    labels,
    updateStatus: {
      getStatusLabels: fetchStatusLabels,
      onStausLabelUpdate: onStatusChange,
      statusLabel,
    } satisfies UpdateLabelStatus,
  };
}
