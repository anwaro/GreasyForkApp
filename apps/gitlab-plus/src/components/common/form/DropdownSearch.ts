import { IconComponent } from '../IconComponent';
import { CloseButton } from '../CloseButton';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

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
        new IconComponent(
          'search',
          's16',
          'gl-search-box-by-type-search-icon'
        ).getElement(),
        this.input,
        {
          tag: 'div',
          classes: 'gl-search-box-by-type-right-icons',
          styles: { top: '0' },
          children: new CloseButton(() => {
            this.input.value = '';
            this.onChange('');
          }).getElement(),
        },
      ],
    });
  }

  private getSearchInput() {
    return Dom.create({
      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => this.onChange(this.input.value),
      },
    });
  }
}
