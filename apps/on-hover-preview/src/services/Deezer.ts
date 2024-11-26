import { BaseService } from './BaseService';

export class Deezer extends BaseService {
  private regExp =
    /deezer\.com\/.{2}\/(?<type>album|playlist|track|artist|podcast|episode)\/(?<id>\d+)/;
  public styles = {
    width: '500px',
    height: '300px',
    borderRadius: '10px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement) {
    const theme = this.theme('light', 'dark');
    const props = this.match(href, this.regExp);
    const params = this.params({
      radius: 'true',
      autoplay: 'true',
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
