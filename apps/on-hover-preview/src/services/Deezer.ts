import { BaseService } from './BaseService';

export class Deezer extends BaseService {
  public styles = {
    width: '500px',
    borderRadius: '10px',
    height: '300px',
  };
  private regExp =
    /deezer\.com\/.{2}\/(?<type>album|playlist|track|artist|podcast|episode)\/(?<id>\d+)/;

  public async embeddedVideoUrl({ href }: HTMLAnchorElement) {
    const theme = this.theme('light', 'dark');
    const props = this.match(href, this.regExp);
    const params = this.params({
      autoplay: 'true',
      radius: 'true',
      tracklist: 'false',
    });

    if (!props) {
      return undefined;
    }
    return `https://widget.deezer.com/widget/${theme}/${props.type}/${props.id}?${params}`;
  }

  public isValidUrl(url: string): boolean {
    return this.regExp.test(url);
  }
}
