import { Issue } from '../../../types/Issue';
import { GitlabLabel } from '../../common/GitlabLabel';
import { IssueBlock } from './IssueBlock';

type Props = {
  issue: Issue;
};

export function IssueLabels({ issue }: Props) {
  if (!issue.labels.nodes.length) {
    return null;
  }

  return (
    <IssueBlock className={'issuable-show-labels'} tile={'Labels'}>
      {issue.labels.nodes.map((label) => (
        <GitlabLabel key={label.id} label={label} />
      ))}
    </IssueBlock>
  );
}
