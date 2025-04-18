import { Issue } from '../../../types/Issue';
import { HeadingBlock } from '../../common/block/HeadingBlock';
import { IssueStatus } from '../../common/IssueStatus';

type Props = {
  issue: Issue;
  onRefresh: () => void;
};

export function IssueHeader({ issue, onRefresh }: Props) {
  return (
    <HeadingBlock
      author={issue.author}
      badge={<IssueStatus isOpen={issue.state === 'opened'} />}
      createdAt={issue.createdAt}
      entityId={`#${issue.iid}`}
      icon={'issue-type-issue'}
      link={issue.webUrl}
      onRefresh={onRefresh}
      title={issue.title}
    />
  );
}
