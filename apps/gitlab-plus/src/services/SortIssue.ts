import { Service } from '../types/Service';
import { Dom } from '@ui/Dom';
import { Observer } from '@ui/Observer';

enum ChildType {
  ownIssue = 'ownIssue',
  ownUserStory = 'ownUserStory',
  userStory = 'userStory',
  issue = 'issue',
  label = 'label',
  unknown = 'unknown',
}

const sortWeight: Record<ChildType, number> = {
  [ChildType.ownIssue]: 10,
  [ChildType.ownUserStory]: 8,
  [ChildType.userStory]: 6,
  [ChildType.issue]: 4,
  [ChildType.unknown]: 2,
  [ChildType.label]: 0,
};

export class SortIssue implements Service {
  public init() {
    const observer = new Observer();
    const userName = this.userName();
    const board = document.querySelector<HTMLDivElement>('.boards-list');
    if (!userName || !board) {
      return;
    }
    observer.start(board, () => this.run(userName));
  }

  private run(userName: string) {
    console.log([...document.querySelectorAll('.board-list')]);
    [...document.querySelectorAll('.board-list:not(.glp-ready)')].forEach(
      (board) => this.initBoard(board as HTMLDivElement, userName)
    );
  }

  private initBoard(board: HTMLDivElement, userName: string) {
    Dom.applyClass(board, 'glp-ready');
    Dom.applyStyles(board, {
      flexDirection: 'column',
      display: 'flex',
    });

    const observer = new Observer();
    observer.start(board, () => this.sortBoard(board, userName), {
      childList: true,
    });
  }

  private sortBoard(board: HTMLDivElement, userName: string) {
    const children = [...board.children].map((element) => ({
      element: element as HTMLElement,
      type: this.childType(element as HTMLElement, userName),
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

  private childType(child: HTMLElement, userName: string): ChildType {
    if (child instanceof HTMLDivElement) {
      return ChildType.label;
    }
    const title = child.querySelector('[data-testid="board-card-title-link"]');
    if (!title) {
      return ChildType.unknown;
    }

    const isOwn = [
      ...child.querySelectorAll<HTMLImageElement>('.gl-avatar-link img'),
    ].some((img) => img.alt.includes(userName));

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

  private userName() {
    const element = document.querySelector<HTMLSpanElement>(
      '.user-bar-dropdown-toggle .gl-button-text .gl-sr-only'
    );
    const testText = ' user’s menu';
    if (element && element.innerText.includes(testText)) {
      return element.innerText.replace(testText, '');
    }
    return undefined;
  }

  private sortChildren(items: { element: HTMLElement; type: ChildType }[]) {
    return items.toSorted((a, b) => {
      return Math.sign(sortWeight[b.type] - sortWeight[a.type]);
    });
  }

  private shouldSort(items: { element: HTMLElement; type: ChildType }[]) {
    return items.some((item) => {
      return [
        ChildType.ownIssue,
        ChildType.ownUserStory,
        ChildType.userStory,
      ].includes(item.type);
    });
  }
}
