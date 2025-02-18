import { Issue } from '../../../types/Issue';
import { UsersBlock } from '../../common/block/UsersBlock';

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
