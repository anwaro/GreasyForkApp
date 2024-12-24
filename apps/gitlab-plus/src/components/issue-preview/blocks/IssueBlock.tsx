import type { ReactNode } from 'preact/compat';

import { Component } from '@ui/Component';
import { HtmlData } from '@ui/Dom';

export class _IssueBlock extends Component<'div'> {
  constructor(
    title = '',
    content: HtmlData['children'],
    classes = '',
    public shouldRender = true
  ) {
    super('div', {
      children: [
        {
          tag: 'div',
          children: title,
          classes:
            'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900',
        },
        {
          tag: 'div',
          children: content,
          classes,
        },
      ],
      classes: 'glp-block',
    });
  }
}

type Props = {
  children: ReactNode;
  className?: string;
  tile: string;
};

export function IssueBlock({ children, className, tile }: Props) {
  return (
    <div class={'glp-block'}>
      <div
        class={
          'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900'
        }
      >
        {tile}
      </div>
      <div class={className}>{children}</div>
    </div>
  );
}
