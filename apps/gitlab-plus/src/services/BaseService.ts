import { ServiceName } from './ServiceName';

export abstract class BaseService {
  abstract readonly name: ServiceName;

  abstract init(): void;

  root(className: string, parent?: HTMLElement, usePrepend = false) {
    const root = document.createElement('div');
    root.classList.add(className);
    if (parent) {
      parent[usePrepend ? 'prepend' : 'append'](root);
    }
    return root;
  }

  rootBody(className: string) {
    return this.root(className, document.body);
  }
}
