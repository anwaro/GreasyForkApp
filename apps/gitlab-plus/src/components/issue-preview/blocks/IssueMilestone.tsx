import { Issue } from '../../../types/Issue';
import { GitlabIcon } from '../../common/GitlabIcon';
import { GitlabLabel } from '../../common/GitlabLabel';
import { IconComponent } from '../../common/IconComponent';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class _IssueMilestone extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      'Milestone',
      issue.milestone
        ? [
            new IconComponent('milestone', 's16', 'gl-mr-2'),
            { tag: 'span', children: issue.milestone.title },
          ]
        : '',
      '',
      !!issue.milestone
    );
  }
}

type Props = {
  issue: Issue;
};

export function IssueMilestone({ issue }: Props) {
  if (!issue.milestone) {
    return null;
  }

  return (
    <IssueBlock   tile={'Milestone'}>
       <GitlabIcon icon={'milestone'} className={'gl-mr-2'} size={16} />
      <span>{issue.milestone.title }</span>
    </IssueBlock>
  );
}
