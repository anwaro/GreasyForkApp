import { Issue } from '../../../types/Issue';
import { GitlabUser } from '../../common/GitlabUser';
import { _UserComponent } from '../../common/UserComponent';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class _IssueAssignee extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      'Assignee',
      issue.assignees.nodes.map((assignee) =>
        new _UserComponent(assignee).getElement()
      ),
      'gl-flex gl-flex-col gl-gap-3',
      !!issue.assignees.nodes.length
    );
  }
}

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
        <GitlabUser key={assignee.id} user={assignee} />
      ))}
    </IssueBlock>
  );
}
