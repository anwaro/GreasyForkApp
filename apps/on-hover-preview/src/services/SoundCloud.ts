import { BaseService } from './BaseService';

export class SoundCloud extends BaseService {
  public styles = {
    width: '600px',
    height: '166px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const params = this.params({
      visual: 'false',
      show_artwork: 'true',
      auto_play: 'true',
      hide_related: 'true',
      show_comments: 'false',
      show_teaser: 'false',
      url: encodeURIComponent(href),
    });

    return `https://w.soundcloud.com/player?${params}`;
  }

  isValidUrl(url: string): boolean {
    return /soundcloud\.com\/[^/]+\/[^/?]+/.test(url);
  }
}
