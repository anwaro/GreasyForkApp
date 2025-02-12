import { Issue } from '../../../types/Issue';
import { Link } from '../../common/base/Link';
import { InfoBlock } from '../../common/bolck/InfoBlock';

type Props = {
  issue: Issue;
};

export function IssueEpic({ issue }: Props) {
  if (!issue.epic) {
    return null;
  }

  return (
    <InfoBlock icon={'epic'} title={'Epic'}>
      <Link href={issue.epic.webUrl} title={issue.epic.title}>
        {issue.epic.title}
      </Link>
    </InfoBlock>
  );
}
