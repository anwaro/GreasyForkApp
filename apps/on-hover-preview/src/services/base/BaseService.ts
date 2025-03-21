export type ServiceStyle = {
  width: string;
  height: string;
} & Record<string, number | string>;

export const defaultServiceStyle: ServiceStyle = {
  width: '500px',
  height: '282px',
};

export abstract class BaseService {
  abstract styles: ServiceStyle;

  createUrl(url: string, params?: Record<string, number | string>): string {
    if (params) {
      return `${url}?${this.params(params)}`;
    }
    return url;
  }

  abstract embeddedVideoUrl(
    element: HTMLAnchorElement
  ): Promise<string | undefined>;

  extractId(url: string, match: RegExp): string {
    const result = this.match<{ id: string }>(url, match);

    return result?.id || '';
  }

  isDarkmode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  abstract isValidUrl(url: string): boolean;

  match<T extends Record<string, string>>(
    url: string,
    match: RegExp
  ): T | undefined {
    const result = url.match(match);

    if (result && result.groups) {
      return result.groups as T;
    }

    return undefined;
  }

  params(params: Record<string, number | string>) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  theme<T>(light: T, dark: T) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? dark
      : light;
  }
}
