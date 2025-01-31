import { BaseService } from './BaseService';

export class Dailymotion extends BaseService {
  public styles = {
    width: '500px',
    height: '280px',
  };

  public async embeddedVideoUrl(element: HTMLAnchorElement): Promise<string> {
    const id = this.extractId(element.href, /video\/(?<id>[^/?]+)[/?]?/);
    return `https://geo.dailymotion.com/player.html?video=${id}`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('dailymotion.com/video');
  }
}
