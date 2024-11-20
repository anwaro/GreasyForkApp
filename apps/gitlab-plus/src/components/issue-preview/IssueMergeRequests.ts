import { Issue } from '../../types/Issue';
import IssueBlock from './IssueBlock';
import { MergeRequestComponent } from '../common/MergeRequestComponent';

export default class IssueMergeRequests extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Merge requests',
      issue.relatedMergeRequests.nodes.map((mr) =>
        new MergeRequestComponent(mr).getElement()
      )
    );
  }
}
