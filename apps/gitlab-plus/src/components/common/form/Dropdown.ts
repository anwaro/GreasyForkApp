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
  private recent: RecentProvider<D>;
  private searchTerm: string;

  protected extra = Dom.element('div');
  private button: DropdownButton<D>;
  private modal: DropdownModal;
  private search: DropdownSearch;
  private list: DropdownList<D>;

  constructor(title: string, key: string, private isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);
    this.recent = new RecentProvider<D>(key);
    this.search = new DropdownSearch(this.load.bind(this));
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
      this.modal.setVisible.bind(this.modal),
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
    } else {
      this.value = [item];
      this.modal.setVisible(false);
    }
    this.button.render(this.value);
    this.render();
    this.onChange();
  }

  reset() {
    this.value = [];
    this.button.render(this.value);
    this.render();
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

  getValue() {
    return this.value;
  }

  private render() {
    const recent = this.recent.get();
    const recentlyIds = recent.map((i) => i.id);
    const itemsIds = this.items.map((i) => i.id);

    const itemsToRender = this.items.filter((i) => !recentlyIds.includes(i.id));
    const recentItemsToRender = this.searchTerm.length
      ? recent.filter((i) => itemsIds.includes(i.id))
      : recent;
    this.list.render(itemsToRender, recentItemsToRender, this.value);
  }
}
