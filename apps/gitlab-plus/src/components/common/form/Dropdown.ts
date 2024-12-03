import { Field } from './Field';
import { DropdownSearch } from './DropdownSearch';
import { DropdownItem, DropdownList } from './DropdownList';
import { DropdownButton } from './DropdownButton';
import { DropdownModal } from './DropdownModal';
import { Dom } from '@ui/Dom';
import { RecentProvider } from '../../../providers/RecentProvider';

export default abstract class Dropdown<D extends DropdownItem> extends Field {
  protected value: D[] = [];
  protected items: D[] = [];
  protected recently: D[] = [];
  protected extra = Dom.element('div');
  private recent: RecentProvider<D>;
  private searchTerm: string;
  private button: DropdownButton<D>;
  private modal: DropdownModal;
  private search: DropdownSearch;
  private list: DropdownList<D>;
  private selectedIndex = -1;

  constructor(title: string, key: string, private isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);
    this.recent = new RecentProvider<D>(key);
    this.search = new DropdownSearch(
      this.load.bind(this),
      this.navigate.bind(this)
    );
    this.list = new DropdownList(
      this.renderItem.bind(this),
      this.onSelect.bind(this),
      this.removeFromRecent.bind(this)
    );
    this.modal = new DropdownModal(
      this.search.getElement(),
      this.list.getElement()
    );

    this.button = new DropdownButton(
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

  abstract renderItem(item: D): HTMLElement;

  abstract renderLabel(item: D[]): HTMLElement;

  abstract onChange(): void;

  abstract load(search: string): Promise<void>;

  updateItems(items: D[], search = '') {
    this.searchTerm = search;
    this.items = items;
    this.render();
  }

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

  reset() {
    this.searchTerm = '';
    this.value = [];
    this.button.render(this.value);
    this.search.reset();
    this.load(this.searchTerm);
  }

  persistRecent() {
    this.recent.add(...this.value);
    this.render();
  }

  removeFromRecent(item: D) {
    this.recent.remove(item);
    this.render();
  }

  getValue() {
    return this.value;
  }

  private showList() {
    this.modal.setVisible(true);
    this.search.focus();
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
      const { recent, items } = this.itemsToRender();
      const total = recent.length + items.length;
      const diff = key === 'ArrowDown' ? 1 : -1;
      this.selectedIndex = (this.selectedIndex + diff + total) % total;
      this.list.updateActive(this.selectedIndex);
    } else if (key === 'Enter') {
      const { recent, items } = this.itemsToRender();
      const allItems = [...recent, ...items];
      if (-1 < this.selectedIndex && this.selectedIndex < allItems.length) {
        this.onSelect(allItems[this.selectedIndex]);
      }
    } else if (key === 'Escape') {
      this.closeList();
    }
  }

  private render() {
    const { recent, items } = this.itemsToRender();

    this.list.render(items, recent, this.value);
    this.list.updateActive(this.selectedIndex);
  }
}
