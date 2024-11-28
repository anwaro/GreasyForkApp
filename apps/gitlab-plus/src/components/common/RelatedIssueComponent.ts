import { IssueRelation, RelatedIssue } from '../../types/Issue';
import { Component } from '@ui/Component';

const statusMap: Record<IssueRelation, string> = {
  relates_to: 'Related to:',
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
};

export class RelatedIssueComponent extends Component<'div'> {
  constructor(issue: RelatedIssue) {
    super('div', {
      styles: {
        marginTop: '10px',
      },
      classes: `item-body `,
      children: [
        {
          tag: 'div',
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
          children: [
            {
              tag: 'span',
              // classes: 'gl-text-gray-500',
              children: statusMap[issue.linkType],
            },
            {
              tag: 'span',
              classes: 'gl-text-gray-500',
              children: `#${issue.iid}`,
            },
          ],
        },
        {
          tag: 'div',
          classes: 'item-title sortable-link',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          children: issue.title,
        },
      ],
    });
  }
}
