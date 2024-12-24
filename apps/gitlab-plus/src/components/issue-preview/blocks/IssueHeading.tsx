import { Dom } from '@ui/Dom';

import { Issue } from '../../../types/Issue';
import { GitlabIcon } from '../../common/GitlabIcon';
import { _StatusComponent, IssueStatus } from '../../common/IssueStatus';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class IssueTitle extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      issue.title,
      Dom.element('div', '', [
        {
          tag: 'div',
          children: new _StatusComponent(issue.state === 'opened'),
        },
        {
          tag: 'div',
          children: issue.description,
          classes: 'gl-text-sm gl-text-gray-500, gl-truncate',
          styles: { maxHeight: '100px' },
        },
      ])
    );
  }
}

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
