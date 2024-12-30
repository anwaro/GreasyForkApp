import { BaseService } from './BaseService';

export class Tableau extends BaseService {
  public styles = {
    width: '850px',
    height: '528px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const id = this.extractId(href, /views\/(?<id>[^/]+)\/?/);

    const params = this.params({
      ':animate_transition': 'yes',
      ':display_count': 'yes',
      ':display_overlay': 'yes',
      ':display_spinner': 'yes',
      ':display_static_image': 'no',
      ':embed': 'y',
      ':embed_code_version': '3',
      ':host_url': 'https%3A%2F%2Fpublic.tableau.com%2F',
      ':language': 'en-US',
      ':loadOrderID': '0',
      ':showVizHome': 'no',
      ':tabs': 'yes',
      ':toolbar': 'yes',
    });

    return `https://public.tableau.com/views/${id}/Video?${params}`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('public.tableau.com/views');
  }
}
