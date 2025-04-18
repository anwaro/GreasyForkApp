import { ComponentChild } from 'preact';

import { Observer } from '@ui/Observer';

import { GitlabLink } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';

export class DrawerWorkItemStatus<Link extends GitlabLink> {
  private btnQuery =
    'aside [data-testid="work-item-labels"] [data-testid="edit-button"]';

  constructor(
    private tag: string,
    private parser: (link: string) => Link | undefined,
    private renderer: (link: Link) => ComponentChild
  ) {
    new Observer().start(document.body, this.onBodyChange.bind(this), {
      childList: true,
      subtree: true,
    });
  }

  private initDrawerStatusSelect(aside: HTMLElement, attempt = 0) {
    if (attempt > 10) {
      return;
    }

    const link = this.parser(
      aside.querySelector<HTMLAnchorElement>(
        '[data-testid="work-item-drawer-ref-link"]'
      )?.href || ''
    );

    if (!link) {
      return;
    }

    const editButton = aside.querySelector<HTMLElement>(this.btnQuery);

    if (!editButton) {
      window.setTimeout(
        () => this.initDrawerStatusSelect(aside, attempt + 1),
        500
      );
      return;
    }

    RendererHelper.render(
      `glp-${this.tag}-status-select`,
      editButton,
      this.renderer(link),
      'after'
    );
  }

  private onBodyChange(mutations: MutationRecord[]) {
    const addedNodes = mutations.flatMap(
      (mutation) => [...mutation.addedNodes] as HTMLElement[]
    );

    const aside = addedNodes.find((node) => node.tagName === 'ASIDE');

    if (aside && aside.dataset.testid === 'work-item-drawer') {
      this.initDrawerStatusSelect(aside);
    }
  }
}
