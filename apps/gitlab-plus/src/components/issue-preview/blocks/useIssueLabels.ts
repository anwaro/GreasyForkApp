import { useCallback, useEffect, useState } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { IssueProvider } from '../../../providers/IssueProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Issue } from '../../../types/Issue';
import { Label } from '../../../types/Label';
import { UpdateStatus } from '../../common/block/useLabelBlock';

export function useIssueLabels(
  issue: Issue,
  link: GitlabIssueLink,
  refetch?: () => Promise<void>
) {
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);

  const onStatusChange = useCallback(
    async (label: Label) => {
      const oldStatusLabel = LabelHelper.getStatusLabel(issue.labels.nodes);

      const labels = [...issue.labels.nodes, label].filter(
        (label) => label.id !== oldStatusLabel?.id
      );

      await new IssueProvider().issueSetLabels({
        iid: issue.iid,
        labelIds: labels.map((l) => l.id),
        projectPath: link.projectPath,
      });

      if (refetch) {
        await refetch();
      }
    },
    [issue]
  );

  const fetchLabels = useCallback(async (projectPath: string) => {
    const response = await new LabelsProvider().getProjectLabels(
      projectPath,
      LabelHelper.getStatusPrefix()
    );
    setStatusLabels(response.data.workspace.labels.nodes);
  }, []);

  useEffect(() => {
    fetchLabels(link.projectPath);
  }, []);

  return {
    labels: issue.labels.nodes,
    updateStatus: {
      labels: statusLabels,
      update: onStatusChange,
    } satisfies UpdateStatus,
  };
}
