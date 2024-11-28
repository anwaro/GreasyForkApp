import { Component } from '@ui/Component';
import { HtmlData } from '@ui/Dom';

export class IssueBlock extends Component<'div'> {
  constructor(
    title: string = '',
    content: HtmlData['children'],
    classes = '',
    public shouldRender = true
  ) {
    super('div', {
      classes: 'glp-block',
      children: [
        {
          tag: 'div',
          classes:
            'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900',
          children: title,
        },
        {
          tag: 'div',
          classes,
          children: content,
        },
      ],
    });
  }
}
