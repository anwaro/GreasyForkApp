import { Component } from '@ui/Component';
import { GlobalStyle } from '@ui/GlobalStyle';

export class Slider extends Component<'input'> {
  static MAX_VALUE = 4;
  static MIN_VALUE = 0.5;

  constructor() {
    super('input', {
      attrs: {
        max: Slider.MAX_VALUE,
        min: Slider.MIN_VALUE,
        step: 0.1,
        type: 'range',
      },
      classes: 'vis-slider',
      styles: {
        minWidth: '150px',
        width: 'calc(100% - 30px)',
        background: '#ffffff66',
        borderRadius: '3px',
        height: '6px',
        margin: '0 10px',
        outline: 'none',
        padding: '0',
      },
    });

    GlobalStyle.addStyle(
      'vis-slider',
      `input[type='range'].vis-slider {
            -webkit-appearance: none;
          }

          input[type='range'].vis-slider::-moz-range-thumb ,
          input[type='range'].vis-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: #fff;
            cursor: pointer;
            margin-top: -2px;
          }`
    );
  }

  getSpeed(): number {
    return parseFloat(this.element.value);
  }

  initEvents(onChange: (speed: number) => void) {
    this.event('change', () => onChange(this.getSpeed()));
    this.event('input', () => onChange(this.getSpeed()));
    this.event('wheel', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const diff = event.deltaY > 0 ? -0.1 : 0.1;
      onChange(this.getSpeed() + diff);
      return false;
    });
  }

  setSpeed(speed: number) {
    this.updateBg(speed);
    this.element.value = speed.toString();
  }

  updateBg(value: number) {
    const progress =
      ((value - Slider.MIN_VALUE) / (Slider.MAX_VALUE - Slider.MIN_VALUE)) *
      100;
    this.element.style.background =
      'linear-gradient(to right, COLOR1 0%, COLOR1 STEP%, COLOR2 STEP%, COLOR2 100%)'
        .replaceAll('COLOR1', 'var(--color-two)')
        .replaceAll('COLOR2', '#ffffff66')
        .replaceAll('STEP', progress.toFixed(1));
  }
}
