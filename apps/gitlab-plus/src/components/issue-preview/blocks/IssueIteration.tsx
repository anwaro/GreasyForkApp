import { useMemo } from 'preact/hooks';

import { Issue } from '../../../types/Issue';
import { Row } from '../../common/base/Row';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabIcon } from '../../common/GitlabIcon';

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
    <InfoBlock
      title={'Iteration'}
      rightTitle={
        <Row>
          <GitlabIcon className={'gl-mr-2'} icon={'iteration'} size={16} />
          <span>{label}</span>
        </Row>
      }
    />
  );
}
