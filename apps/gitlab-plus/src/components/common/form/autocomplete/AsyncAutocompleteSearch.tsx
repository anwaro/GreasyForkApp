import { CloseButton } from '../../CloseButton';
import { GitlabIcon } from '../../GitlabIcon';

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
