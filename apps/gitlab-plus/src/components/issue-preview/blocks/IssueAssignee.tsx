import { Issue } from '../../../types/Issue';
import { UsersBlock } from '../../common/bolck/UsersBlock';

type Props = {
  issue: Issue;
};

export function IssueAssignee({ issue }: Props) {
  return (
    <UsersBlock
      assignees={issue.assignees.nodes}
      icon={'assignee'}
      label={'Assignee'}
    />
  );
}
