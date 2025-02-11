import { Issue } from '../../../types/Issue';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabIcon } from '../../common/GitlabIcon';

type Props = {
  issue: Issue;
};

export function IssueEpic({ issue }: Props) {
  if (!issue.epic) {
    return null;
  }

  return (
    <InfoBlock title={'Epic'}>
      <GitlabIcon className={'gl-mr-2'} icon={'epic'} size={16} />
      <span>{issue.epic.title}</span>
    </InfoBlock>
  );
}
