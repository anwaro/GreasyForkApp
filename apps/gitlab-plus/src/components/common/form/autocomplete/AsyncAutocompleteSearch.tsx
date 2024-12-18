import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { debounce } from '@utils/debounce';

import { _CloseButton, CloseButton } from '../../CloseButton';
import { GitlabIcon } from '../../GitlabIcon';
import { IconComponent } from '../../IconComponent';

export class _AsyncAutocompleteSearch extends Component<'div'> {
  private readonly input: HTMLInputElement;

  constructor(
    private onChange: (value: string) => void,
    private navigate: (value: string) => void
  ) {
    super('div', {
      classes: 'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown',
    });

    this.input = this.getSearchInput();
    this.element.append(this.getSearch());
  }

  focus() {
    this.input.focus();
  }

  reset() {
    this.input.value = '';
  }

  private getSearch() {
    return Dom.create({
      tag: 'div',
      children: [
        new IconComponent('search', 's16', 'gl-search-box-by-type-search-icon'),
        this.input,
        {
          tag: 'div',
          children: new _CloseButton(() => {
            this.input.value = '';
            this.onChange('');
          }, 'Clear input'),
          classes: 'gl-search-box-by-type-right-icons',
          styles: { top: '0' },
        },
      ],
      classes: 'gl-listbox-search gl-listbox-topmost',
    });
  }

  private getSearchInput() {
    const search = debounce(this.onChange.bind(this));

    return Dom.create({
      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => search(this.input.value),
        keydown: (e: Event) => this.navigate((e as KeyboardEvent).key),
      },
    });
  }
}

/*

      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => search(this.input.value),
        keydown: (e: Event) => this.navigate((e as KeyboardEvent).key),
      },
  }
 */

type Props = {
  navigate: (value: string) => void;
  setValue: (value: string) => void;
  value: string;
};

export function AsyncAutocompleteSearch({ navigate, setValue, value }: Props) {
  return (
    <div class={'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown'}>
      <div class={'gl-listbox-search gl-listbox-topmost'}>
        <GitlabIcon
          icon={'search'}
          className={'gl-search-box-by-type-search-icon'}
          size={16}
        />
        <input
          autofocus
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => navigate(e.key)}
          class={'gl-listbox-search-input'}
          value={value}
        />
        {Boolean(value) && (
          <div class={'gl-search-box-by-type-right-icons'} style={{ top: '0' }}>
            <CloseButton onClick={() => setValue('')} title={'Clear input'} />
          </div>
        )}
      </div>
    </div>
  );
}
