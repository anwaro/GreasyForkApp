import { Issue } from '../../../types/Issue';
import { GitlabIcon } from '../../common/GitlabIcon';
import { IssueStatus } from '../../common/IssueStatus';
import { IssueBlock } from './IssueBlock';

type Props = {
  issue: Issue;
};

export function IssueHeader({ issue }: Props) {
  return (
    <IssueBlock tile={issue.title}>
      <div>
        <div class={'gl-flex'}>
          <GitlabIcon
            icon={'issue-type-issue'}
            className={'gl-mr-2'}
            size={16}
          />
          <span class={'gl-text-sm gl-text-secondary gl-mr-4'}>
            #{issue.iid}
          </span>
          <IssueStatus isOpen={issue.state === 'opened'} />
        </div>
      </div>
    </IssueBlock>
  );
}
