import { Issue } from '../../../types/Issue';
import { HeadingBlock } from '../../common/bolck/HeadingBlock';
import { IssueStatus } from '../../common/IssueStatus';

type Props = {
  issue: Issue;
};

export function IssueHeader({ issue }: Props) {
  return (
    <HeadingBlock
      author={issue.author}
      badge={<IssueStatus isOpen={issue.state === 'opened'} />}
      createdAt={issue.createdAt}
      entityId={`#${issue.iid}`}
      icon={'issue-type-issue'}
      title={issue.title}
    />
  );
}
