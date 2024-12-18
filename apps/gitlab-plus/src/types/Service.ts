export abstract class Service {
  abstract init(): void;

  root(className: string, parent?: HTMLElement) {
    const root = document.createElement('div');
    root.classList.add(className);
    if (parent) {
      parent.append(root);
    }
    return root;
  }

  rootBody(className: string) {
    return this.root(className, document.body);
  }
}
