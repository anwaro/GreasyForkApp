import type { ReactNode } from 'preact/compat';

import { Dom } from '@ui/Dom';

import { RecentProvider } from '../../../../providers/RecentProvider';
import { _FormField } from '../FormField';
import {
  _AsyncAutocompleteInput,
  AsyncAutocompleteButton,
} from './AsyncAutocompleteButton';
import {
  _AsyncAutocompleteDropdown,
  AsyncAutocompleteDropdown,
} from './AsyncAutocompleteDropdown';
import { _AsyncAutocompleteList } from './AsyncAutocompleteList';
import { _AsyncAutocompleteSearch } from './AsyncAutocompleteSearch';
import { OptionItem } from './types';
import { useAsyncAutocomplete } from './useAsyncAutocomplete';

export default abstract class _AsyncAutocomplete<
  D extends OptionItem
> extends _FormField {
  protected extra = Dom.element('div');
  protected items: D[] = [];
  protected recently: D[] = [];
  protected value: D[] = [];
  private button: _AsyncAutocompleteInput<D>;
  private list: _AsyncAutocompleteList<D>;
  private modal: _AsyncAutocompleteDropdown;
  private recent: RecentProvider<D>;
  private search: _AsyncAutocompleteSearch;
  private searchTerm = '';
  private selectedIndex = -1;

  constructor(title: string, key: string, private isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);
    this.recent = new RecentProvider<D>(key);
    this.search = new _AsyncAutocompleteSearch(
      this.load.bind(this),
      this.navigate.bind(this)
    );
    this.list = new _AsyncAutocompleteList(
      this.renderItem.bind(this),
      this.onSelect.bind(this),
      this.removeFromRecent.bind(this)
    );
    this.modal = new _AsyncAutocompleteDropdown(
      this.search.getElement(),
      this.list.getElement()
    );

    this.button = new _AsyncAutocompleteInput(
      this.renderLabel.bind(this),
      (visible: boolean) => {
        if (visible) {
          this.showList();
        } else {
          this.closeList();
        }
      },
      this.reset.bind(this)
    );

    container.append(
      this.extra,
      this.button.getElement(),
      this.modal.getElement()
    );

    this.button.render(this.value);
    this.list.render(this.items, this.recently, this.value);
  }

  getValue() {
    return this.value;
  }

  abstract load(search: string): Promise<void>;

  abstract onChange(): void;

  onSelect(item: D) {
    if (this.isMultiselect) {
      if (this.value.find((i) => i.id === item.id)) {
        this.value = this.value.filter((i) => i.id !== item.id);
      } else {
        this.value.push(item);
      }
      this.search.focus();
    } else {
      this.value = [item];
      this.closeList();
    }
    this.button.render(this.value);
    this.list.updateSelected(this.value);
    this.onChange();
  }

  persistRecent() {
    this.recent.add(...this.value);
    this.render();
  }

  removeFromRecent(item: D) {
    this.recent.remove(item);
    this.render();
  }

  abstract renderItem(item: D): HTMLElement;

  abstract renderLabel(item: D[]): HTMLElement;

  reset() {
    this.searchTerm = '';
    this.value = [];
    this.button.render(this.value);
    this.search.reset();
    this.load(this.searchTerm);
  }

  updateItems(items: D[], search = '') {
    this.searchTerm = search;
    this.items = items;
    this.render();
  }

  private closeList() {
    this.modal.setVisible(false);
    this.search.reset();
    this.load('');
  }

  private itemsToRender() {
    const recent = this.recent.get();
    const recentlyIds = recent.map((i) => i.id);
    const itemsIds = this.items.map((i) => i.id);

    const itemsToRender = this.items.filter((i) => !recentlyIds.includes(i.id));
    const recentItemsToRender = this.searchTerm.length
      ? recent.filter((i) => itemsIds.includes(i.id))
      : recent;

    return {
      items: itemsToRender,
      recent: recentItemsToRender,
    };
  }

  private navigate(key: string) {
    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      const { items, recent } = this.itemsToRender();
      const total = recent.length + items.length;
      const diff = key === 'ArrowDown' ? 1 : -1;
      this.selectedIndex = (this.selectedIndex + diff + total) % total;
      this.list.updateActive(this.selectedIndex);
    } else if (key === 'Enter') {
      const { items, recent } = this.itemsToRender();
      const allItems = [...recent, ...items];
      if (-1 < this.selectedIndex && this.selectedIndex < allItems.length) {
        this.onSelect(allItems[this.selectedIndex]);
      }
    } else if (key === 'Escape') {
      this.closeList();
    }
  }

  private render() {
    const { items, recent } = this.itemsToRender();

    this.list.render(items, recent, this.value);
    this.list.updateActive(this.selectedIndex);
  }

  private showList() {
    this.modal.setVisible(true);
    this.search.focus();
  }
}

type Props<D extends OptionItem> = {
  getValues: (search: string) => Promise<D[]>;
  isMultiselect?: boolean;
  name: string;
  onChange: (values: D[]) => void;
  renderLabel: (value: D[]) => ReactNode;
  renderOption: (value: D) => ReactNode;
  value: D[];
};

export function AsyncAutocomplete<D extends OptionItem>({
  getValues,
  isMultiselect = false,
  name,
  onChange,
  renderLabel,
  renderOption, value
}: Props<D>) {
  const { isOpen, onClick, options, searchTerm, setIsOpen, setSearchTerm } =
    useAsyncAutocomplete<D>(name, value, getValues, onChange, isMultiselect);

  return (
    <div class={'gl-relative gl-w-full gl-new-dropdown !gl-block'}>
      <AsyncAutocompleteButton<D>
        isOpen={isOpen}
        renderLabel={renderLabel}
        reset={() => onChange([])}
        setIsOpen={setIsOpen}
        value={value}
      />
      <AsyncAutocompleteDropdown<D>
        onClick={onClick}
        onClose={() => setIsOpen(false)}
        options={options}
        renderOption={renderOption}
        isOpen={isOpen}
        name={name}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        value={value}
      />
    </div>
  );
}
