import { IconComponent } from '../IconComponent';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export type DropdownItem = { id: string | number };

export class DropdownList<D extends DropdownItem> extends Component<'div'> {
  private list: HTMLUListElement;

  constructor(
    private renderItem: (item: D) => HTMLElement,
    private onClick: (item: D) => void
  ) {
    super('div', {
      classes:
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents',
    });
    this.list = Dom.element('ul', 'gl-mb-0 gl-pl-0');
    this.element.append(this.list);
  }

  render(items: D[], recently: D[], selected: D[]) {
    this.list.replaceChildren();
    if (recently.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong',
          children: 'Recently used',
        })
      );
      this.list.append(
        ...recently.map((item) => this.listItem(item, selected))
      );
    }

    if (items.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t',
        })
      );

      this.list.append(...items.map((item) => this.listItem(item, selected)));
    }

    if (items.length + recently.length === 0) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes: 'gl-p-4',
          children: 'No options',
        })
      );
    }
  }

  listItem(item: D, selected: D[]) {
    return Dom.create({
      tag: 'li',
      classes: 'gl-new-dropdown-item',
      events: {
        click: () => this.onClick(item),
      },
      children: {
        tag: 'span',
        classes: 'gl-new-dropdown-item-content',
        children: [this.renderCheck(item, selected), this.renderItem(item)],
      },
    });
  }

  renderCheck(item: D, selected: D[]) {
    const selectedIds = selected.map((i) => i.id);
    return new IconComponent(
      selectedIds.includes(item.id) ? 'mobile-issue-close' : ''
    ).getElement();
  }
}
