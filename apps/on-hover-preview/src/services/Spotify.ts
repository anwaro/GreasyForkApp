import { BaseService } from './BaseService';

export class Spotify extends BaseService {
  private regExp =
    /spotify\.com\/(.+\/)?(?<type>track|album|playlist|show)\/(?<id>[\w-]+)/;
  public styles = {
    width: '600px',
    height: '152px',
    borderRadius: '12px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const props = this.match(href, this.regExp);

    if (!props) {
      return undefined;
    }

    this.setStyle(props.type);
    const suffix = props.type === 'show' ? '/video' : '';

    return `https://open.spotify.com/embed/${props.type}/${props.id}${suffix}`;
  }

  isValidUrl(url: string): boolean {
    return this.regExp.test(url);
  }

  private setStyle(type: string) {
    if (type === 'track') {
      this.styles.height = '152px';
    } else if (type === 'album') {
      this.styles.height = '352px';
    } else if (type === 'playlist') {
      this.styles.height = '352px';
    } else if (type === 'show') {
      this.styles.height = '352px';
    } else {
      this.styles.height = '300px';
    }
  }
}
