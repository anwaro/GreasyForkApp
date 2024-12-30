import { Store } from '@store/Store';
import { Observer } from '@ui/Observer';

import { Elements } from '../components/Elements';
import { MenuItem } from '../components/MenuItem';
import { Player } from '../components/Player';

export class AppController {
  private item: MenuItem;
  private menuObserver = new Observer();
  private player = new Player();
  private rememberSpeed: Store<boolean>;

  private speed: Store<number>;
  private videoObserver = new Observer();

  constructor() {
    this.rememberSpeed = new Store('vis-remember-speed');
    this.speed = new Store('vis-speed');
    this.item = new MenuItem(
      this.setSpeed.bind(this),
      this.setRemember.bind(this)
    );
    this.setSpeed(this.getSpeed());
    this.setRemember(this.rememberSpeed.get(false));
  }

  getSpeed() {
    return this.rememberSpeed.get(false) ? this.speed.get(1) : 1;
  }

  init() {
    const video = Elements.video();
    const menu = Elements.menu();
    if (video && menu) {
      this.videoObserver.start(video, this.mount.bind(this));
      this.menuObserver.start(menu, this.mount.bind(this));
      this.mount();
      this.setSpeed(this.getSpeed());
      return true;
    }

    return false;
  }

  mount() {
    this.item.mountItem();
  }

  setRemember(state: boolean) {
    this.rememberSpeed.set(state);
    this.item.setRemember(state);
  }

  setSpeed(speed: number) {
    this.speed.set(speed);
    this.player.setSpeed(speed);
    this.item.setSpeed(speed);
  }
}
