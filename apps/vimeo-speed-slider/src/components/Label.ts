import { Component } from '@ui/Component';

import { Elements } from './Elements';

export class Label extends Component<'span'> {
  private label = 'Speed';
  private speed = '1.0';

  constructor() {
    super('span');
  }

  init() {
    const originalItemLabel = Elements.menuSpeedLabel();
    if (originalItemLabel) {
      this.label = originalItemLabel.innerText;
      this.element.className = originalItemLabel.className;
    }
    const itemLabel = Elements.menuItemLabel();
    if (itemLabel) {
      this.element.className = itemLabel.className;
    }
    this.render();
  }

  setSpeed(speed: number) {
    this.speed = speed.toFixed(1);
    this.render();
  }

  private render() {
    this.element.innerText = `${this.label}: ${this.speed}`;
  }
}
