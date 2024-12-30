import { Store } from '@store/Store';
import { Observer } from '@ui/Observer';

import { Checkbox } from '../components/Checkbox';
import { Icon } from '../components/Icon';
import { Label } from '../components/Label';
import { Menu } from '../components/Menu';
import { Player } from '../components/Player';
import { Slider } from '../components/Slider';
import { SpeedMenuItem } from '../components/SpeedMenuItem';

export class AppController {
  private checkbox: Checkbox;
  private icon: Icon;
  private label: Label;
  private menu: Menu;
  private observer: Observer;
  private player: Player;
  private rememberSpeed = new Store<boolean>('yts-remember-speed');
  private slider: Slider;

  private speed = new Store<number>('yts-speed');
  private readonly speedMenuItem: SpeedMenuItem;

  constructor() {
    const initialSpeed = this.getSpeed();

    this.menu = new Menu();
    this.player = new Player(initialSpeed);
    this.speedMenuItem = new SpeedMenuItem();
    this.icon = new Icon();
    this.label = new Label(initialSpeed);
    this.slider = new Slider(initialSpeed);
    this.checkbox = new Checkbox(this.rememberSpeed.get(false));
    this.observer = new Observer();

    this.speedMenuItem.addElement(
      this.icon.getElement(),
      this.label.getElement(),
      this.slider.getElement(),
      this.checkbox.getElement()
    );

    this.initEvents();
  }

  checkboxEvent(_: Event) {
    this.rememberSpeed.set(this.checkbox.getValue());
  }

  getSpeed() {
    return this.rememberSpeed.get() ? this.speed.get(1) : 1;
  }

  async initApp() {
    this.player.setSpeed(this.getSpeed());

    await this.menu.reopenMenu();

    const label = this.menu.getLabel();
    if (label) {
      this.label.updateLabel(label);
    }

    const player = this.player.getPlayer();
    if (player) {
      this.observer.start(player, this.mutationCallback.bind(this));
    }

    return this.menu.addCustomSpeedItem(this.speedMenuItem);
  }

  initEvents() {
    this.slider.event('change', this.sliderChangeEvent.bind(this));
    this.slider.event('input', this.sliderChangeEvent.bind(this));
    this.slider.event('wheel', this.sliderWheelEvent.bind(this));
    this.checkbox.event('change', this.checkboxEvent.bind(this));
    document.addEventListener('spfdone', this.initApp.bind(this));
  }

  mutationCallback() {
    this.initApp();
  }

  sliderChangeEvent(_: Event) {
    this.updateSpeed(this.slider.getSpeed());
  }

  sliderWheelEvent(event: WheelEvent) {
    const current = this.slider.getSpeed();
    const diff = event.deltaY > 0 ? -0.1 : 0.1;
    const value = Math.max(
      Slider.MIN_VALUE,
      Math.min(current + diff, Slider.MAX_VALUE)
    );

    if (current != value) {
      this.slider.setSpeed(value);
      this.updateSpeed(value);
    }
    event.preventDefault();
  }

  updateSpeed(speed: number) {
    this.speed.set(speed);
    this.player.setSpeed(speed);
    this.label.updateSpeed(speed);
  }
}
