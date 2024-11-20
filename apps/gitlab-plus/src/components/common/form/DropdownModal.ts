import { Component } from '@ui/Component';

export class DropdownModal extends Component<'div'> {
  constructor(search: HTMLElement, list: HTMLElement) {
    super('div', {
      classes: 'gl-new-dropdown-panel gl-absolute',
      styles: {
        top: '100%',
        left: '0',
        width: '100%',
        maxWidth: '800px',
      },
      events: {
        click: (e) => e.stopPropagation(),
      },
      children: {
        tag: 'div',
        classes: 'gl-new-dropdown-inner',
        children: [search, list],
      },
    });
  }

  setVisible(visible: boolean) {
    if (visible) {
      this.element.classList.add('!gl-block');
    } else {
      this.element.classList.remove('!gl-block');
    }
  }
}
