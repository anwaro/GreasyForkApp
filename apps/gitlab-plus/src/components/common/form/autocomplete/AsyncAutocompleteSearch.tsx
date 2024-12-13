import { IconComponent } from '../../IconComponent';
import { _CloseButton, CloseButton } from '../../CloseButton';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { debounce } from '@utils/debounce';
import { GitlabIcon } from '../../GitlabIcon';

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
          children: new _CloseButton(() => {
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
        keydown: (e: Event) => this.navigate((e as KeyboardEvent).key),
      },
    });
  }

  reset() {
    this.input.value = '';
  }

  focus() {
    this.input.focus();
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
  value: string;
  setValue: (value: string) => void;
  navigate: (value: string) => void;
};

export function AsyncAutocompleteSearch({ value, setValue, navigate }: Props) {
  return (
    <div class={'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown'}>
      <div class={'gl-listbox-search gl-listbox-topmost'}>
        <GitlabIcon
          icon={'search'}
          size={16}
          className={'gl-search-box-by-type-search-icon'}
        />
        <input
          class={'gl-listbox-search-input'}
          value={value}
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => navigate(e.key)}
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
