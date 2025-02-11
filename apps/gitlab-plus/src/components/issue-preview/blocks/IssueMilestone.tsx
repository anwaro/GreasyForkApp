import { Issue } from '../../../types/Issue';
import { Row } from '../../common/base/Row';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabIcon } from '../../common/GitlabIcon';

type Props = {
  issue: Issue;
};

export function IssueMilestone({ issue }: Props) {
  if (!issue.milestone) {
    return null;
  }

  return (
    <InfoBlock
      title={'Milestone'}
      rightTitle={
        <Row>
          <GitlabIcon className={'gl-mr-2'} icon={'milestone'} size={16} />
          <span>{issue.milestone.title}</span>
        </Row>
      }
    />
  );
}
