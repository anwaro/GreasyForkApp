import { Component } from '@ui/Component';

export default class IssueBlock extends Component<'div'> {
  constructor(
    title: string = '',
    content: HTMLElement[] | HTMLElement | string,
    classes = ''
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
