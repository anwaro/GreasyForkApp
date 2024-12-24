import { useMemo } from 'preact/hooks';

import { Issue } from '../../../types/Issue';
import { GitlabIcon } from '../../common/GitlabIcon';
import { IconComponent } from '../../common/IconComponent';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class _IssueIteration extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      'Iteration',
      issue.iteration
        ? [
            new IconComponent('iteration', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              children: _IssueIteration.label(
                issue.iteration?.iterationCadence?.title,
                issue.iteration.startDate,
                issue.iteration.dueDate
              ),
            },
          ]
        : '',
      '',
      !!issue.iteration
    );
  }

  static label(title: string, start: string, end: string) {
    const date = (date: string) => {
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(date));
    };

    return [title, ': ', date(start), ' - ', date(end)].join('');
  }
}

type Props = {
  issue: Issue;
};

export function IssueIteration({ issue }: Props) {
  const label = useMemo(() => {
    const date = (date: string) => {
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(date));
    };

    if (!issue.iteration) {
      return '';
    }

    return [
      issue.iteration.iterationCadence?.title,
      ': ',
      date(issue.iteration.startDate),
      ' - ',
      date(issue.iteration.dueDate),
    ].join('');
  }, [issue]);

  if (!issue.iteration) {
    return null;
  }

  return (
    <IssueBlock tile={'Iteration'}>
      <GitlabIcon icon={'iteration'} className={'gl-mr-2'} size={16} />
      <span>{label}</span>
    </IssueBlock>
  );
}
