import { ServiceFactory } from './base/ServiceFactory';

export class Dailymotion extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://geo.dailymotion.com/player.html?video=:id',
      pattern: /dailymotion\.com\/video\/(?<id>[^/?]+)/,
    });
  }
}
