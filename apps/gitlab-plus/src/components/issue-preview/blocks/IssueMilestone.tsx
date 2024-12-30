import { Issue } from '../../../types/Issue';
import { GitlabIcon } from '../../common/GitlabIcon';
import { IssueBlock } from './IssueBlock';

type Props = {
  issue: Issue;
};

export function IssueMilestone({ issue }: Props) {
  if (!issue.milestone) {
    return null;
  }

  return (
    <IssueBlock tile={'Milestone'}>
      <GitlabIcon icon={'milestone'} className={'gl-mr-2'} size={16} />
      <span>{issue.milestone.title}</span>
    </IssueBlock>
  );
}
