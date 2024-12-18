import type { ReactNode } from 'preact/compat';

import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { randomId } from '@utils/id';

import { _CloseButton } from '../../CloseButton';
import { IconComponent } from '../../IconComponent';
import { AsyncAutocompleteOption } from './AsyncAutocompleteOption';
import { OptionItem } from './types';

export type DropdownItem = { id: number | string };

export class _AsyncAutocompleteList<
  D extends DropdownItem
> extends Component<'div'> {
  private readonly id = randomId(5, 'glp-list-');
  private list: HTMLUListElement;

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
          children: 'Recently used',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong',
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
          children: 'No options',
          classes: 'gl-p-4',
        })
      );
    }
  }

  renderRemove(item: D) {
    const onClose = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.removeFromRecent) {
        this.removeFromRecent(item);
      }
    };
    return new _CloseButton(onClose, 'Remove from recently used');
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
      if (id && selectedIds.includes(id)) {
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
      attrs: {
        'data-id': item.id,
      },
      children: {
        tag: 'span',
        children: [
          new IconComponent(
            'mobile-issue-close',
            's16',
            'glp-item-check gl-pr-2'
          ),
          this.renderItem(item),
          ...(removeItem ? [this.renderRemove(item)] : []),
        ],
        classes: 'gl-new-dropdown-item-content',
      },
      classes: `gl-new-dropdown-item ${selectedClass} glp-item-${index}`,
      events: {
        click: () => this.onClick(item),
      },
    });
  }
}

type Props<D extends OptionItem> = {
  activeIndex: number;
  onClick: (item: D) => void;
  options: D[];
  recently: D[];
  removeRecently?: (value: D) => void;
  renderOption: (value: D) => ReactNode;
  value: D[];
};

export function AsyncAutocompleteList<D extends OptionItem>({
  activeIndex,
  onClick,
  options,
  recently,
  removeRecently,
  renderOption,
  value,
}: Props<D>) {
  return (
    <div
      class={
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents'
      }
      style={{
        maxWidth: '800px',
        width: '100%',
        left: '0',
        top: '100%',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div class={'gl-new-dropdown-inner'}>
        <ul class={'gl-mb-0 gl-pl-0'}>
          {Boolean(recently.length) && (
            <>
              <li
                class={
                  'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong'
                }
              >
                Recently used
              </li>
              {recently.map((item, index) => (
                <AsyncAutocompleteOption<D>
                  key={item.id}
                  onClick={onClick}
                  option={item}
                  removeFromRecent={removeRecently}
                  renderOption={renderOption}
                  isActive={index === activeIndex}
                  selected={value}
                />
              ))}
            </>
          )}
          {Boolean(options.length) && (
            <>
              <li
                class={
                  'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t'
                }
              />
              {options.map((item, index) => (
                <AsyncAutocompleteOption<D>
                  key={item.id}
                  onClick={onClick}
                  option={item}
                  renderOption={renderOption}
                  isActive={recently.length + index === activeIndex}
                  selected={value}
                />
              ))}
            </>
          )}
          {options.length + recently.length === 0 && (
            <li class={'gl-p-4'}>No options</li>
          )}
        </ul>
      </div>
    </div>
  );
}
