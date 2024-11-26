import { IconComponent } from '../IconComponent';
import { CloseButton } from '../CloseButton';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { debounce } from '@utils/debounce';

export class DropdownSearch extends Component<'div'> {
  private readonly input: HTMLInputElement;

  constructor(private onChange: (value: string) => void) {
    super('div', {
      classes: 'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown',
    });

    this.input = this.getSearchInput();
    this.element.append(this.getSearch());
  }

  private getSearch() {
    return Dom.create({
      tag: 'div',
      classes: 'gl-listbox-search gl-listbox-topmost',
      children: [
        new IconComponent('search', 's16', 'gl-search-box-by-type-search-icon'),
        this.input,
        {
          tag: 'div',
          classes: 'gl-search-box-by-type-right-icons',
          styles: { top: '0' },
          children: new CloseButton(() => {
            this.input.value = '';
            this.onChange('');
          }, 'Clear input'),
        },
      ],
    });
  }

  private getSearchInput() {
    const search = debounce(this.onChange.bind(this));

    return Dom.create({
      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => search(this.input.value),
      },
    });
  }
}
