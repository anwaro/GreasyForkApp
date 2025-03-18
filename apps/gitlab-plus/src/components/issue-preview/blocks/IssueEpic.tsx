import { LabelHelper } from '../../../helpers/LabelHelper';
import { Issue } from '../../../types/Issue';
import { Link } from '../../common/base/Link';
import { InfoBlock } from '../../common/block/InfoBlock';
import { StatusIndicator } from '../../common/StatusIndicator';

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
        <StatusIndicator
          label={LabelHelper.getStatusLabel(issue.epic.labels?.nodes)}
        />
        {issue.epic.title}
      </Link>
    </InfoBlock>
  );
}
