import { Cache } from '@store/Cache';
import { camelizeKeys } from '@utils/camelizeKeys';

export class GitlabProvider {
  private cache = new Cache('glp-');
  private graphqlApi = 'https://gitlab.com/api/graphql';
  private url = 'https://gitlab.com/api/v4/';

  constructor(private force = false) {}

  async cached<T>(
    key: string,
    getValue: () => Promise<T>,
    minutes: number
  ): Promise<T> {
    const cacheValue = this.cache.get<T>(key);
    if (cacheValue && !this.force) {
      return cacheValue;
    }

    const value = await getValue();

    this.cache.set(key, value, minutes);

    return value;
  }

  csrf() {
    const token = document.querySelector('meta[name=csrf-token]');
    if (token) {
      return token.getAttribute('content');
    }
    return '';
  }

  async get<R>(path: string): Promise<R> {
    const response = await fetch(`${this.url}${path}`, {
      headers: this.headers(),
      method: 'GET',
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async getCached<T>(key: string, path: string, minutes: number): Promise<T> {
    return this.cached(key, () => this.get<T>(path), minutes);
  }

  headers() {
    const headers: Record<string, string> = {
      'content-type': 'application/json',
    };

    const csrf = this.csrf();
    if (csrf) {
      headers['X-CSRF-Token'] = csrf;
    }

    return headers;
  }

  async post<D, R>(path: string, body: D): Promise<R> {
    const response = await fetch(`${this.url}${path}`, {
      body: JSON.stringify(body),
      headers: this.headers(),
      method: 'POST',
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async query<T>(
    query: string,
    variables: Record<string, unknown>
  ): Promise<T> {
    const response = await fetch(this.graphqlApi, {
      body: JSON.stringify({ query, variables }),
      headers: this.headers(),
      method: 'POST',
    });
    return response.json();
  }

  async queryCached<T>(
    key: string,
    query: string,
    variables: Record<string, unknown>,
    minutes: number
  ): Promise<T> {
    return this.cached(key, () => this.query<T>(query, variables), minutes);
  }
}
