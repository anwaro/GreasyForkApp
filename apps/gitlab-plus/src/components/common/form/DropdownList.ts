import { IconComponent } from '../IconComponent';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { CloseButton } from '../CloseButton';
import { randomId } from '@utils/id';

export type DropdownItem = { id: string | number };

export class DropdownList<D extends DropdownItem> extends Component<'div'> {
  private list: HTMLUListElement;
  private readonly id = randomId(5, 'glp-list-');

  constructor(
    private renderItem: (item: D) => HTMLElement,
    private onClick: (item: D) => void,
    private removeFromRecent: ((item: D) => void) | undefined = undefined
  ) {
    super('div', {
      classes:
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents',
    });
    this.list = Dom.element('ul', `gl-mb-0 gl-pl-0 ${this.id}`);
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
        ...recently.map((item, i) => this.listItem(item, selected, i, true))
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

      this.list.append(
        ...items.map((item, i) =>
          this.listItem(item, selected, recently.length + i)
        )
      );
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

  updateActive(index: number) {
    const activeClass = `glp-active`;
    const itemClass = `glp-item-${index}`;

    const prevActiveItem = document.querySelector<HTMLLIElement>(
      `.${this.id} .${activeClass}`
    );
    if (prevActiveItem && !prevActiveItem.classList.contains(itemClass)) {
      prevActiveItem.classList.remove(activeClass);
    }

    const selectedItem = document.querySelector<HTMLLIElement>(
      `.${this.id} .${itemClass}`
    );
    if (selectedItem && !selectedItem.classList.contains(activeClass)) {
      selectedItem.classList.add(activeClass);
      selectedItem.scrollIntoView({ block: 'center' });
    }
  }

  updateSelected(selected: D[]) {
    const selectedIds = selected.map((i) => i.id);
    const selectedClass = `glp-selected`;
    const items = document.querySelectorAll<HTMLLIElement>(
      `.${this.id} .gl-new-dropdown-item`
    );

    items.forEach((item) => {
      const id = item.dataset.id;
      if (selectedIds.includes(id)) {
        item.classList.add(selectedClass);
      } else {
        item.classList.remove(selectedClass);
      }
    });
  }

  private listItem(item: D, selected: D[], index: number, removeItem = false) {
    const selectedIds = selected.map((i) => i.id);
    const selectedClass = selectedIds.includes(item.id) ? 'glp-selected' : '';

    return Dom.create({
      tag: 'li',
      classes: `gl-new-dropdown-item ${selectedClass} glp-item-${index}`,
      events: {
        click: () => this.onClick(item),
      },
      attrs: {
        'data-id': item.id,
      },
      children: {
        tag: 'span',
        classes: 'gl-new-dropdown-item-content',
        children: [
          new IconComponent(
            'mobile-issue-close',
            's16',
            'glp-item-check gl-pr-2'
          ),
          this.renderItem(item),
          ...(removeItem ? [this.renderRemove(item)] : []),
        ],
      },
    });
  }

  renderRemove(item: D) {
    const onClose = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeFromRecent && this.removeFromRecent(item);
    };
    return new CloseButton(onClose, 'Remove from recently used');
  }
}
