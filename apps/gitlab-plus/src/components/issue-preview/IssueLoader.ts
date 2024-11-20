import { Component } from '@ui/Component';

export default class IssueLoader extends Component<'div'> {
  constructor() {
    super('div', {
      classes: 'glp-modal-loader',
      children: {
        tag: 'div',
        classes: 'glp-modal-loader-inner',
      },
    });
  }
}
