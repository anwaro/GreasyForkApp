import { Dom } from '@ui/Dom';

import { Issue } from '../../../types/Issue';
import { GitlabLabel } from '../../common/GitlabLabel';
import { LabelComponent } from '../../common/LabelComponent';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class _IssueLabels extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      'Labels',
      Dom.create({
        tag: 'div',
        children: issue.labels.nodes.map((label) => new LabelComponent(label)),
        classes: 'issuable-show-labels',
      }),
      '',
      !!issue.labels.nodes.length
    );
  }
}

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
