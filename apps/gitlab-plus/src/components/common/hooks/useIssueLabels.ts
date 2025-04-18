import { useCallback, useMemo } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { IssueProvider } from '../../../providers/IssueProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Issue } from '../../../types/Issue';
import { Label } from '../../../types/Label';
import { UpdateLabelStatus } from '../block/LabelsBlock';

type Props = {
  issue?: Issue;
  link: GitlabIssueLink;
  refetch?: () => Promise<void>;
};

export function useIssueLabels({ issue, link, refetch }: Props) {
  const { labels, statusLabel } = useMemo(() => {
    const labels = issue?.labels.nodes || [];
    return {
      labels,
      statusLabel: LabelHelper.getStatusLabel(labels),
    };
  }, [issue]);

  const onStatusChange = useCallback(
    async (label: Label) => {
      const updatedLabels = [
        ...labels.filter((label) => label.id !== statusLabel?.id),
        label,
      ];

      if (!issue) {
        return;
      }
      await new IssueProvider().issueSetLabels({
        iid: issue.iid,
        labelIds: updatedLabels.map((l) => l.id),
        projectPath: link.projectPath,
      });

      if (refetch) {
        await refetch();
      }
    },
    [issue, labels, statusLabel]
  );

  const fetchStatusLabels = useCallback(async () => {
    const response = await new LabelsProvider().getProjectLabels(
      link.projectPath,
      LabelHelper.getStatusPrefix()
    );
    return response.data.workspace.labels.nodes;
  }, []);

  return {
    labels,
    updateStatus: {
      getStatusLabels: fetchStatusLabels,
      onStausLabelUpdate: onStatusChange,
      statusLabel: LabelHelper.getStatusLabel(labels),
    } satisfies UpdateLabelStatus,
  };
}
