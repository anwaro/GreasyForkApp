import { useCallback } from 'preact/hooks';

import { IssueProvider } from '../../../providers/IssueProvider';
import { Issue } from '../../../types/Issue';
import { Label } from '../../../types/Label';
import { LabelsBlock } from '../../common/bolck/LabelsBlock';

type Props = {
  issue: Issue;
  projectPath?: string;
  refetch?: () => Promise<void>;
};

export function IssueLabels({ issue, projectPath, refetch }: Props) {
  if (!issue.labels.nodes.length) {
    return null;
  }

  const onStatusChange = useCallback(
    async (projectPath: string, label: Label) => {
      const statusLabel = issue.labels.nodes.find((l) =>
        l.title.includes('Status::')
      );
      const labels = statusLabel
        ? issue.labels.nodes.map((l) => (l.id === statusLabel.id ? label : l))
        : [...issue.labels.nodes, label];

      await new IssueProvider().issueSetLabels({
        iid: issue.iid,
        labelIds: labels.map((l) => l.id),
        projectPath,
      });

      if (refetch) {
        await refetch();
      }
    },
    [projectPath, issue]
  );

  return (
    <LabelsBlock
      labels={issue.labels.nodes}
      onStatusChange={onStatusChange}
      projectPath={projectPath}
    />
  );
}
