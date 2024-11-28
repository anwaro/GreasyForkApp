import { Cache } from '@store/Cache';
import { camelizeKeys } from '@utils/camelizeKeys';

export class GitlabProvider {
  private cache = new Cache('glp-');
  private url = 'https://gitlab.com/api/v4/';
  private graphqlApi = 'https://gitlab.com/api/graphql';

  async get<R>(path: string): Promise<R> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: this.headers(),
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async post<D, R>(path: string, body: D): Promise<R> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(),
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async query<T>(
    query: string,
    variables: Record<string, unknown>
  ): Promise<T> {
    const response = await fetch(this.graphqlApi, {
      method: 'POST',
      body: JSON.stringify({ variables, query }),
      headers: this.headers(),
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

  async getCached<T>(key: string, path: string, minutes: number): Promise<T> {
    return this.cached(key, () => this.get<T>(path), minutes);
  }

  async cached<T>(
    key: string,
    getValue: () => Promise<T>,
    minutes: number
  ): Promise<T> {
    const cacheValue = this.cache.get<T>(key);
    if (cacheValue) {
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
}
