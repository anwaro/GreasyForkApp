import { Issue } from '../../types/Issue';
import IssueBlock from './IssueBlock';
import { LabelComponent } from '../common/LabelComponent';
import { Dom } from '@ui/Dom';

export default class IssueLabels extends IssueBlock {
  constructor(issue: Issue) {
    super(
      'Labels',
      Dom.create({
        tag: 'div',
        classes: 'issuable-show-labels',
        children: issue.labels.nodes.map((label) =>
          new LabelComponent(label).getElement()
        ),
      })
    );
  }
}
