import { Component } from '@ui/Component';

export class CreateButton extends Component<'button'> {
  constructor() {
    super('button', {
      classes: 'btn btn-default btn-sm gl-button',
      attrs: {
        type: 'button',
      },
      children: {
        tag: 'span',
        classes: 'gl-button-text',
        children: 'Create related issue',
      },
    });
  }

  init() {
    const parent = document.querySelector(
      '#related-issues [data-testid="crud-actions"]'
    );

    if (parent && !this.element.parentNode) {
      this.mount(parent as HTMLElement);
    }
  }
}
