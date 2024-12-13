export abstract class Service {
  abstract init(): void;

  root(className: string) {
    const root = document.createElement('div');
    root.classList.add(className);
    document.body.appendChild(root);
    return root;
  }

  rootBody(className: string) {
    const root = this.root(className);
    document.body.appendChild(root);
    return root;
  }
}
