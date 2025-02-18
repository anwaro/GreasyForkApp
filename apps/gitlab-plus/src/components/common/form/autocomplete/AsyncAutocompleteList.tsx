import type { ComponentChild } from 'preact';

import { AsyncAutocompleteOption } from './AsyncAutocompleteOption';
import { OptionItem } from './types';

type Props<D extends OptionItem> = {
  hideCheckbox?: boolean;
  activeIndex: number;
  onClick: (item: D) => void;
  options: D[];
  recently: D[];
  removeRecently?: (value: D) => void;
  renderOption: (value: D) => ComponentChild;
  value: D[];
};

export function AsyncAutocompleteList<D extends OptionItem>({
  hideCheckbox,
  activeIndex,
  onClick,
  options,
  recently,
  removeRecently,
  renderOption,
  value,
}: Props<D>) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      class={
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents'
      }
      style={{
        maxWidth: '800px',
        width: '100%',
        left: '0',
        top: '100%',
      }}
    >
      <div class={'gl-new-dropdown-inner'}>
        <ul class={'gl-mb-0 gl-pl-0'}>
          {Boolean(recently.length) && (
            <>
              <li
                class={
                  'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong'
                }
              >
                Recently used
              </li>
              {recently.map((item, index) => (
                <AsyncAutocompleteOption<D>
                  key={item.id}
                  hideCheckbox={hideCheckbox}
                  isActive={index === activeIndex}
                  onClick={onClick}
                  option={item}
                  removeFromRecent={removeRecently}
                  renderOption={renderOption}
                  selected={value}
                />
              ))}
            </>
          )}
          {Boolean(options.length) && (
            <>
              <li
                class={
                  'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t'
                }
              />
              {options.map((item, index) => (
                <AsyncAutocompleteOption<D>
                  key={item.id}
                  hideCheckbox={hideCheckbox}
                  isActive={recently.length + index === activeIndex}
                  onClick={onClick}
                  option={item}
                  renderOption={renderOption}
                  selected={value}
                />
              ))}
            </>
          )}
          {options.length + recently.length === 0 && (
            <li class={'gl-p-4'}>No options</li>
          )}
        </ul>
      </div>
    </div>
  );
}
