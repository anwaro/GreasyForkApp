import IssueBlock from './IssueBlock';
import { Issue } from '../../types/Issue';
import { IconComponent } from '../common/IconComponent';

export default class IssueMilestone extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Milestone',
      issue.milestone
        ? [
            new IconComponent('milestone', 's16', 'gl-mr-2'),
            { tag: 'span', children: issue.milestone.title },
          ]
        : ''
    );
  }
}
