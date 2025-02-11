import { BaseService } from './BaseService';

export class Tidal extends BaseService {
  public styles = {
    width: '500px',
    borderRadius: '10px',
    height: '300px',
  };
  private regExp =
    /tidal\.com\/(.+\/)?(?<type>track|album|video|playlist)\/(?<id>\d+|[\w-]+)/;

  public async embeddedVideoUrl({ href }: HTMLAnchorElement) {
    const props = this.match(href, this.regExp);

    if (!props) {
      return undefined;
    }
    this.setStyle(props.type);
    return `https://embed.tidal.com/${props.type}s/${props.id}`;
  }

  public isValidUrl(url: string): boolean {
    return this.regExp.test(url);
  }

  private setStyle(type: string) {
    if (type === 'track') {
      this.styles.height = '120px';
    } else if (type === 'playlist') {
      this.styles.height = '400px';
    } else if (type === 'video') {
      this.styles.height = '281px';
    } else {
      this.styles.height = '300px';
    }
  }
}
