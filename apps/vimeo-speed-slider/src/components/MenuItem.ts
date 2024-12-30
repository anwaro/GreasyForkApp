import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

import { Checkbox } from './Checkbox';
import { Elements } from './Elements';
import { Label } from './Label';
import { Slider } from './Slider';

export class MenuItem extends Component<'div'> {
  public static readonly ID = 'vis-menu-speed-item';
  private checkbox = new Checkbox(false);
  private label = new Label();
  private slider = new Slider();
  private wrapper = Dom.create({
    tag: 'div',
    styles: {
      alignItems: 'center',
      display: 'flex',
    },
  });

  constructor(
    setSpeed: (speed: number) => void,
    setRemember: (state: boolean) => void
  ) {
    super('div', { attrs: { id: MenuItem.ID } });

    this.wrapper.append(this.checkbox.getElement(), this.slider.getElement());
    this.element.append(this.label.getElement(), this.wrapper);
    this.slider.initEvents(setSpeed);
    this.checkbox.initEvents(setRemember);
  }

  mountItem() {
    const originalSpeedItem = Elements.menuSpeedItem();
    const originalQualityItem = Elements.menuQualityItem();
    if (!originalSpeedItem && !originalQualityItem) {
      this.element.parentNode?.removeChild(this.element);
      return;
    }

    originalSpeedItem?.style.setProperty('display', 'none');
    if (!this.element.parentNode) {
      if (originalSpeedItem) {
        originalSpeedItem.after(this.element);
      } else if (originalQualityItem) {
        originalQualityItem.after(this.element);
      }

      this.label.init();
      this.element.className =
        Elements.menuItem()?.className || this.element.className;
    }
  }

  setRemember(state: boolean) {
    this.checkbox.setValue(state);
  }

  setSpeed(speed: number) {
    this.slider.setSpeed(speed);
    this.label.setSpeed(speed);
  }
}
