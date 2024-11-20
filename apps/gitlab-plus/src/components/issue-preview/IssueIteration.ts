import IssueBlock from './IssueBlock';
import { Issue } from '../../types/Issue';

export default class IssueIteration extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Iteration',
      issue.iteration
        ? [
            issue.iteration.iterationCadence.title,
            ': ',
            new Date(issue.iteration.startDate).toLocaleDateString(),
            ' - ',
            new Date(issue.iteration.dueDate).toLocaleDateString(),
          ].join('')
        : ''
    );
  }
}
