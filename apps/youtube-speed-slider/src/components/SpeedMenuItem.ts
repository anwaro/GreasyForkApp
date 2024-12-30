import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export class SpeedMenuItem extends Component<'div'> {
  public static readonly ID = 'yts-speed-menu-item';
  private wrapper = Dom.element('div', 'ytp-menuitem-content');

  constructor() {
    super('div', {
      attrs: {
        id: SpeedMenuItem.ID,
      },
      classes: 'ytp-menuitem',
    });
  }

  addElement(
    icon: HTMLDivElement,
    label: HTMLDivElement,
    slider: HTMLInputElement,
    checkbox: HTMLInputElement
  ) {
    this.element.append(icon, label, this.wrapper);
    this.wrapper.append(checkbox, slider);
  }
}
