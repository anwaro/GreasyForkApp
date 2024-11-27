import IssueBlock from './IssueBlock';
import { Issue } from '../../types/Issue';
import { IconComponent } from '../common/IconComponent';

export default class IssueIteration extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Iteration',
      issue.iteration
        ? [
            new IconComponent('iteration', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              children: IssueIteration.label(
                issue.iteration.iterationCadence.title,
                issue.iteration.startDate,
                issue.iteration.dueDate
              ),
            },
          ]
        : ''
    );
  }

  static label(title: string, start: string, end: string) {
    const date = (date: string) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(date));
    };

    return [title, ': ', date(start), ' - ', date(end)].join('');
  }
}
