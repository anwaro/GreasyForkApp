import { Issue } from '../../../types/Issue';
import { GitlabUser } from '../../common/GitlabUser';
import { IssueBlock } from './IssueBlock';

type Props = {
  issue: Issue;
};

export function IssueAssignee({ issue }: Props) {
  if (!issue.assignees.nodes.length) {
    return null;
  }

  return (
    <IssueBlock className={'gl-flex gl-flex-col gl-gap-3'} tile={'Assignee'}>
      {issue.assignees.nodes.map((assignee) => (
        <GitlabUser key={assignee.id} withLink user={assignee} />
      ))}
    </IssueBlock>
  );
}
