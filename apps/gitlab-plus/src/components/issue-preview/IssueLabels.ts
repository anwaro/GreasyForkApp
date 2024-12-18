import { Dom } from '@ui/Dom';

import { Issue } from '../../types/Issue';
import { LabelComponent } from '../common/LabelComponent';
import { IssueBlock } from './IssueBlock';

export class IssueLabels extends IssueBlock {
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
