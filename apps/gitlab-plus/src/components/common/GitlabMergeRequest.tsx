import { Component } from '@ui/Component';

import { MergeRequest } from '../../types/Issue';
import { GitlabIcon } from './GitlabIcon';
import { GitlabUser } from './GitlabUser';
import { IconComponent, IconNames } from './IconComponent';
import { _UserComponent } from './UserComponent';

const iconMap: Record<MergeRequest['state'], IconNames> = {
  closed: 'merge-request-close',
  locked: 'search',
  merged: 'merge',
  opened: 'merge-request',
};

export class _GitlabMR extends Component<'div'> {
  constructor(mr: MergeRequest) {
    super('div', {
      children: [
        {
          tag: 'div',
          children: [
            new IconComponent(
              iconMap[mr.state] || 'empty',
              's16',
              'merge-request-status',
              mr.state
            ),
            {
              tag: 'span',
              children: `!${mr.iid}`,
              classes: 'gl-text-gray-500',
            },
            new _UserComponent(mr.author, 's16'),
          ],
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
        },
        {
          tag: 'div',
          children: mr.title,
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

type Props = {
  mr: MergeRequest;
};

export function GitlabMergeRequest({ mr }: Props) {
  return (
    <div class={'item-body'} style={{ marginTop: 10 }}>
      <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
        <GitlabIcon
          icon={iconMap[mr.state] || 'empty'}
          className={'merge-request-status'}
          size={16}
        />
        <span class={'gl-text-gray-500'}>!{mr.iid}</span>
        <GitlabUser size={16} user={mr.author} />
      </div>
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        class={'item-title sortable-link'}
      >
        {mr.title}
      </div>
    </div>
  );
}
