import {
  _AsyncAutocompleteList,
  DropdownItem,
} from '../common/form/autocomplete/AsyncAutocompleteList';
import { _AsyncAutocompleteSearch } from '../common/form/autocomplete/AsyncAutocompleteSearch';
import { _AsyncAutocompleteDropdown } from '../common/form/autocomplete/AsyncAutocompleteDropdown';
import { Component } from '@ui/Component';

export class AutocompleteModal<
  D extends DropdownItem
> extends Component<'div'> {
  private list: _AsyncAutocompleteList<D>;
  private modal: _AsyncAutocompleteDropdown;

  constructor(
    onSelect: (item: D) => void,
    renderItem: (item: D) => HTMLElement,
    search: (term: string) => void
  ) {
    super('div', {
      classes: 'gl-relative gl-w-full gl-new-dropdown !gl-block',
    });

    const modalSearch = new _AsyncAutocompleteSearch(search, () => {
      // pass
    });
    this.list = new _AsyncAutocompleteList(renderItem, onSelect);
    this.modal = new _AsyncAutocompleteDropdown(
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
