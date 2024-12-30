import { BaseService } from './BaseService';

export class AppleMusic extends BaseService {
  public styles = {
    width: '500px',
    borderRadius: '12px',
    height: '450px',
  };
  private regExp = /music\.apple\.com\/.{2}\/(?<id>music-video|artist|album)/;

  public async embeddedVideoUrl({
    href,
    pathname,
  }: HTMLAnchorElement): Promise<string> {
    this.setStyle(href);

    return `https://embed.music.apple.com${pathname}`;
  }

  public isValidUrl(url: string): boolean {
    return this.regExp.test(url);
  }

  private setStyle(href: string) {
    const type = this.extractId(href, this.regExp);

    if (type === 'music-video') {
      this.styles.height = '281px';
    } else {
      this.styles.height = '450px';
    }
  }
}
