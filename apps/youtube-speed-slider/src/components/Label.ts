import { Component } from '@ui/Component';

export class Label extends Component<'div'> {
  private label: string;
  private speed = '1.0';

  constructor(speed: number, label = 'Speed') {
    super('div', { classes: 'ytp-menuitem-label' });
    this.label = label;

    this.updateSpeed(speed);
  }

  updateLabel(label = 'Speed') {
    this.label = label;
    this.updateText();
  }

  updateSpeed(speed: number) {
    this.speed = speed.toFixed(1);
    this.updateText();
  }

  updateText() {
    this.element.innerText = `${this.label}: ${this.speed}`;
  }
}
