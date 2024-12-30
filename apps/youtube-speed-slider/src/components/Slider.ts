import { Component } from '@ui/Component';

export class Slider extends Component<'input'> {
  static MAX_VALUE = 4;
  static MIN_VALUE = 0.5;

  constructor(speed: number) {
    super('input', {
      attrs: {
        max: Slider.MAX_VALUE,
        min: Slider.MIN_VALUE,
        step: 0.1,
        type: 'range',
        value: speed.toString(),
      },
      styles: {
        width: 'calc(100% - 30px)',
        accentColor: '#f00',
        margin: '0 5px',
        padding: '0',
      },
    });
  }

  getSpeed(): number {
    return parseFloat(this.element.value);
  }

  setSpeed(speed: number) {
    this.element.value = speed.toString();
  }
}
