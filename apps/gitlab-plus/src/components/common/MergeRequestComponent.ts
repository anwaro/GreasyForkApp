import { IconComponent, IconNames } from './IconComponent';
import { MergeRequest } from '../../types/Issue';
import { _UserComponent } from './UserComponent';
import { Component } from '@ui/Component';

const iconMap: Record<MergeRequest['state'], IconNames> = {
  merged: 'merge',
  opened: 'merge-request',
  closed: 'merge-request-close',
  locked: 'search',
};

export class MergeRequestComponent extends Component<'div'> {
  constructor(mr: MergeRequest) {
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
            new IconComponent(
              iconMap[mr.state] || 'empty',
              's16',
              'merge-request-status',
              mr.state
            ),
            {
              tag: 'span',
              classes: 'gl-text-gray-500',
              children: `!${mr.iid}`,
            },
            new _UserComponent(mr.author, 's16'),
          ],
        },
        {
          tag: 'div',
          classes: 'item-title sortable-link',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          children: mr.title,
        },
      ],
    });
  }
}
