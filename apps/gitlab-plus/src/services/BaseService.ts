import { ServiceName } from '../consts/ServiceName';

export abstract class BaseService {
  abstract readonly name: ServiceName;
  protected ready = false;

  abstract init(): void;

  protected setup(
    callback: VoidFunction,
    linkValidator?: (url: string) => boolean
  ) {
    if (linkValidator && !linkValidator(window.location.href)) {
      return;
    }

    callback();
    [1, 3, 5].forEach((time) => {
      window.setTimeout(() => {
        if (!this.ready) {
          callback();
        }
      }, time * 1000);
    });
  }
}
