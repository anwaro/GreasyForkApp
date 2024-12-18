import { Component } from '@ui/Component';

import { IssueRelation, RelatedIssue } from '../../types/Issue';

const statusMap: Record<IssueRelation, string> = {
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
  relates_to: 'Related to:',
};

export class RelatedIssueComponent extends Component<'div'> {
  constructor(issue: RelatedIssue) {
    super('div', {
      children: [
        {
          tag: 'div',
          children: [
            {
              tag: 'span',
              // classes: 'gl-text-gray-500',
              children: statusMap[issue.linkType],
            },
            {
              tag: 'span',
              children: `#${issue.iid}`,
              classes: 'gl-text-gray-500',
            },
          ],
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
        },
        {
          tag: 'div',
          children: issue.title,
          classes: 'item-title sortable-link',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      ],
      classes: `item-body `,
      styles: {
        marginTop: '10px',
      },
    });
  }
}
