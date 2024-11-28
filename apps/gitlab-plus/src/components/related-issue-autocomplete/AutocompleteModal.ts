import { DropdownItem, DropdownList } from '../common/form/DropdownList';
import { DropdownSearch } from '../common/form/DropdownSearch';
import { DropdownModal } from '../common/form/DropdownModal';
import { Component } from '@ui/Component';

export class AutocompleteModal<
  D extends DropdownItem
> extends Component<'div'> {
  private list: DropdownList<D>;
  private modal: DropdownModal;

  constructor(
    onSelect: (item: D) => void,
    renderItem: (item: D) => HTMLElement,
    search: (term: string) => void
  ) {
    super('div', {
      classes: 'gl-relative gl-w-full gl-new-dropdown !gl-block',
    });

    const modalSearch = new DropdownSearch(search);
    this.list = new DropdownList(renderItem, onSelect);
    this.modal = new DropdownModal(
      modalSearch.getElement(),
      this.list.getElement()
    );
    this.element.append(this.modal.getElement());

    this.updateItems([]);
  }

  updateItems(items: D[]) {
    this.list.render(items, [], []);
  }

  setVisible(visible: boolean) {
    this.modal.setVisible(visible);
  }
}
