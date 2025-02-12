import { Issue } from '../../../types/Issue';
import { InfoBlock } from '../../common/bolck/InfoBlock';

type Props = {
  issue: Issue;
};

export function IssueMilestone({ issue }: Props) {
  if (!issue.milestone) {
    return null;
  }

  return (
    <InfoBlock
      icon={'milestone'}
      rightTitle={issue.milestone.title}
      title={'Milestone'}
    />
  );
}
