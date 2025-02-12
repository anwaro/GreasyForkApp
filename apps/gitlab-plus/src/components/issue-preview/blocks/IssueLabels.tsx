import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { Issue } from '../../../types/Issue';
import { LabelsBlock } from '../../common/bolck/LabelsBlock';
import { useIssueLabels } from './useIssueLabels';

type Props = {
  issue: Issue;
  link: GitlabIssueLink;
  refetch?: () => Promise<void>;
};

export function IssueLabels({ issue, link, refetch }: Props) {
  const { labels, updateStatus } = useIssueLabels(issue, link, refetch);

  if (!labels.length) {
    return null;
  }

  return <LabelsBlock labels={labels} updateStatus={updateStatus} />;
}
