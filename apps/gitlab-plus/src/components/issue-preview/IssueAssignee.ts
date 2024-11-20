import IssueBlock from './IssueBlock';
import { Issue } from '../../types/Issue';
import { UserComponent } from '../common/UserComponent';

export default class IssueAssignee extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Assignee',
      issue.assignees.nodes.map((assignee) =>
        new UserComponent(assignee).getElement()
      ),
      'gl-flex gl-flex-col gl-gap-3'
    );
  }
}
