import { BaseService } from './BaseService';

export class Tiktok extends BaseService {
  public styles = {
    width: '338px',
    height: '575px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const id = this.extractId(href, /video\/(?<id>\d+)/);

    return `https://www.tiktok.com/embed/v2/${id}`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('tiktok.com') && /video\/\d+/.test(url);
  }
}
