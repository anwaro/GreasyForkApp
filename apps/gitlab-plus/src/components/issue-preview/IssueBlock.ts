import { Component } from '@ui/Component';
import { HtmlData } from '@ui/Dom';

export default class IssueBlock extends Component<'div'> {
  constructor(title: string = '', content: HtmlData['children'], classes = '') {
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
