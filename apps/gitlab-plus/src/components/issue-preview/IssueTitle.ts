import { IssueBlock } from './IssueBlock';
import { Issue } from '../../types/Issue';
import { StatusComponent } from '../common/StatusComponent';
import { Dom } from '@ui/Dom';
import { IconComponent } from '../common/IconComponent';

export class IssueTitle extends IssueBlock {
  constructor(issue: Issue) {
    super(
      issue.title,
      Dom.element('div', '', [
        {
          tag: 'div',
          classes: 'gl-flex',
          children: [
            new IconComponent('issue-type-issue', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              classes: 'gl-text-sm gl-text-secondary gl-mr-4',
              children: `#${issue.iid}`,
            },
            new StatusComponent(issue.state === 'opened'),
          ],
        },
        {
          tag: 'div',
          styles: { maxHeight: '100px' },
          classes: 'gl-text-sm gl-text-gray-500, gl-truncate',
          children: issue.description,
        },
      ])
    );
  }
}
