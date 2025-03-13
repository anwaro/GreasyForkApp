import { useCallback, useEffect, useState } from 'preact/hooks';

import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { IssueProvider } from '../../../providers/IssueProvider';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Issue } from '../../../types/Issue';
import { Label } from '../../../types/Label';
import { UpdateStatus } from '../../common/block/useLabelBlock';
import { UserConfig } from '../../user-settings/UserConfig';
import { userSettingsStore } from '../../user-settings/UserSettingsStore';

export function useIssueLabels(
  issue: Issue,
  link: GitlabIssueLink,
  refetch?: () => Promise<void>
) {
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);
  const onStatusChange = useCallback(
    async (label: Label) => {
      const statusLabel = issue.labels.nodes.find((l) =>
        l.title.includes(
          userSettingsStore.getConfig(UserConfig.StatusLabelPrefix)
        )
      );
      const labels = statusLabel
        ? issue.labels.nodes.map((l) => (l.id === statusLabel.id ? label : l))
        : [...issue.labels.nodes, label];

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
      userSettingsStore.getConfig(UserConfig.StatusLabelPrefix)
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
