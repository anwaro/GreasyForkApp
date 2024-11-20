import { Field } from './Field';
import { DropdownSearch } from './DropdownSearch';
import { DropdownItem, DropdownList } from './DropdownList';
import { DropdownButton } from './DropdownButton';
import { DropdownModal } from './DropdownModal';
import { Dom } from '@ui/Dom';

export default abstract class Dropdown<D extends DropdownItem> extends Field {
  protected value: D[] = [];
  protected items: D[] = [];
  protected recently: D[] = [];

  protected extra = Dom.element('div');
  private button: DropdownButton<D>;
  private modal: DropdownModal;
  private search: DropdownSearch;
  private list: DropdownList<D>;

  constructor(title: string, private isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);

    this.search = new DropdownSearch(this.filter.bind(this));
    this.list = new DropdownList(
      this.renderItem.bind(this),
      this.onSelect.bind(this)
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

  abstract filter(search: string): void;

  updateItems(items: D[], recently: D[] = []) {
    const recentlyIds = recently.map((i) => i.id);
    this.recently = recently;
    this.items = items.filter((i) => !recentlyIds.includes(i.id));
    this.list.render(this.items, this.recently, this.value);
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
    this.list.render(this.items, this.recently, this.value);
    this.onChange();
  }

  reset() {
    this.value = [];
    this.button.render(this.value);
    this.list.render(this.items, this.recently, this.value);
    this.onChange();
  }
}
