import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { Issue } from '../../../types/Issue';
import { UsersBlock } from '../../common/block/UsersBlock';
import { useIssueAssignees } from './useIssueAssignees';

type Props = {
  issue: Issue;
  link: GitlabIssueLink;
  refetch?: () => Promise<void>;
};

export function IssueAssignees({ issue, link, refetch }: Props) {
  const { isLoading, onUpdate } = useIssueAssignees({ issue, link, refetch });

  return (
    <UsersBlock
      assign={{ isLoading, onUpdate }}
      icon={'assignee'}
      label={'Assignee'}
      users={issue.assignees.nodes}
    />
  );
}
