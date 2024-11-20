import IssueBlock from './IssueBlock';
import { Issue } from '../../types/Issue';

export default class IssueMilestone extends IssueBlock {
  constructor(issue: Issue) {
    super('Milestone', issue.milestone ? issue.milestone.title : '');
  }
}
