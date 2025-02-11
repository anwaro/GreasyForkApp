import { BaseService } from './BaseService';

export class Twitter extends BaseService {
  public styles = {
    width: '480px',
    height: '300px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement) {
    const id = this.extractId(href, /status\/(?<id>[^/?]+)[/?]?/);
    const platform = href.includes('twitter.com') ? 'twitter' : 'x';

    const params = this.params({
      id,
      maxWidth: '480',
    });

    return `https://platform.${platform}.com/embed/Tweet.html?${params}`;
  }

  isValidUrl(url: string): boolean {
    return /https:\/\/(twitter|x)\.com\/.+\/status\/\d+/.test(url);
  }
}
