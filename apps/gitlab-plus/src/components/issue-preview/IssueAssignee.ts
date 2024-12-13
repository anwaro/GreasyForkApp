import { IssueBlock } from './IssueBlock';
import { Issue } from '../../types/Issue';
import { _UserComponent } from '../common/UserComponent';

export class IssueAssignee extends IssueBlock {
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
