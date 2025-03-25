import { ServiceName } from '../consts/ServiceName';

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

  runInit(callback: VoidFunction) {
    callback();
    [1, 3, 5].forEach((time) => {
      window.setTimeout(callback, time * 1000);
    });
  }
}
