import { IconComponent } from '../IconComponent';
import { DropdownItem } from './DropdownList';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export class DropdownButton<
  D extends DropdownItem
> extends Component<'button'> {
  private readonly buttonLabel = Dom.element(
    'span',
    'gl-new-dropdown-button-text'
  );
  private icon = Dom.create({
    tag: 'span',
    children: [new IconComponent('chevron-lg-down', 's16').getElement()],
  });

  constructor(
    private renderLabel: (items: D[]) => HTMLElement,
    setVisible: (visible: boolean) => void,
    private reset: () => void
  ) {
    super('button', {
      classes:
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle',
      attrs: {
        type: 'button',
      },
      events: {
        click: () => setVisible(true),
      },
    });

    document.body.addEventListener('click', (e) => {
      if (
        e.target !== this.element &&
        !this.element.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    });

    this.element.append(this.buttonInner());
  }

  render(items: D[]) {
    this.buttonLabel.replaceChildren(this.renderLabel(items));
    const icon = new IconComponent(
      items.length ? 'close-xs' : 'chevron-lg-down',
      's16'
    ).getElement();
    if (items.length) {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        this.reset();
      });
    }
    this.icon.replaceChildren(icon);
  }

  private buttonInner() {
    return Dom.create({
      tag: 'span',
      classes: 'gl-button-text gl-w-full',
      children: [this.buttonLabel, this.icon],
    });
  }
}
