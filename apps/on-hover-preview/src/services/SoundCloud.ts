import { BaseService } from './BaseService';

export class SoundCloud extends BaseService {
  public styles = {
    width: '600px',
    height: '166px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const params = this.params({
      hide_related: 'true',
      auto_play: 'true',
      show_artwork: 'true',
      show_comments: 'false',
      show_teaser: 'false',
      url: encodeURIComponent(href),
      visual: 'false',
    });

    return `https://w.soundcloud.com/player?${params}`;
  }

  isValidUrl(url: string): boolean {
    return /soundcloud\.com\/[^/]+\/[^/?]+/.test(url);
  }
}
