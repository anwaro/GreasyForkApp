import { Dom } from '@ui/Dom';
import { Observer } from '@ui/Observer';

import { ServiceName } from '../consts/ServiceName';
import { UsersProvider } from '../providers/UsersProvider';
import { BaseService } from './BaseService';

enum ChildType {
  issue = 'issue',
  label = 'label',
  ownIssue = 'ownIssue',
  ownUserStory = 'ownUserStory',
  unknown = 'unknown',
  userStory = 'userStory',
}

const sortWeight: Record<ChildType, number> = {
  [ChildType.issue]: 4,
  [ChildType.label]: 0,
  [ChildType.ownIssue]: 10,
  [ChildType.ownUserStory]: 8,
  [ChildType.unknown]: 2,
  [ChildType.userStory]: 6,
};

export class SortIssue extends BaseService {
  public name = ServiceName.SortIssue;
  private userName = '';

  public init() {
    this.setup();
  }

  private childType(child: HTMLElement): ChildType {
    if (child instanceof HTMLDivElement) {
      return ChildType.label;
    }
    const title = child.querySelector('[data-testid="board-card-title-link"]');
    if (!title) {
      return ChildType.unknown;
    }

    const isOwn = [
      ...child.querySelectorAll<HTMLImageElement>('.gl-avatar-link img'),
    ].some((img) => img.alt.includes(this.userName));

    const isUserStory = [
      ...child.querySelectorAll<HTMLSpanElement>('.gl-label'),
    ].some((span) => span.innerText.includes('User Story'));

    if (isUserStory && isOwn) {
      return ChildType.ownUserStory;
    }
    if (isOwn) {
      return ChildType.ownIssue;
    }
    if (isUserStory) {
      return ChildType.userStory;
    }
    return ChildType.issue;
  }

  private initBoard(board: HTMLDivElement) {
    Dom.applyClass(board, 'glp-ready');

    const observer = new Observer();
    observer.start(board, () => this.sortBoard(board), {
      childList: true,
    });
  }

  private run() {
    [...document.querySelectorAll('.board-list:not(.glp-ready)')].forEach(
      (board) => this.initBoard(board as HTMLDivElement)
    );
  }

  private async setup() {
    const response = await new UsersProvider().getCurrentUser();
    this.userName = response.data.currentUser.username;
    const observer = new Observer();
    const board = document.querySelector<HTMLDivElement>('.boards-list');
    if (board) {
      observer.start(board, () => this.run());
    }
  }

  private shouldSort(items: { element: HTMLElement; type: ChildType }[]) {
    return items.some((item) => {
      return [ChildType.ownIssue, ChildType.ownUserStory].includes(item.type);
    });
  }

  private sortBoard(board: HTMLDivElement) {
    Dom.applyStyles(board, {
      display: 'flex',
      flexDirection: 'column',
    });
    const children = [...board.children].map((element) => ({
      element: element as HTMLElement,
      type: this.childType(element as HTMLElement),
    }));

    if (!this.shouldSort(children)) {
      return;
    }

    this.sortChildren(children).forEach(({ element }, index) => {
      const order =
        index !== children.length - 1 ? index + 1 : children.length + 100;
      element.style.order = `${order}`;
    });
  }

  private sortChildren(items: { element: HTMLElement; type: ChildType }[]) {
    return items.toSorted((a, b) => {
      return Math.sign(sortWeight[b.type] - sortWeight[a.type]);
    });
  }
}
