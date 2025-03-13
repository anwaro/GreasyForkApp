import { useState } from 'preact/hooks';

import { clsx } from '@utils/clsx';

import { Row } from '../common/base/Row';
import { Text } from '../common/base/Text';
import { GitlabButton } from '../common/GitlabButton';

type Props = {
  setValue: (value: string) => void;
  value: string;
};

export function UserConfigForm({ setValue, value }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <Row gap={2} items={'center'} justify={'end'}>
      {isEditable ? (
        <>
          <input
            className={clsx('gl-form-input form-control gl-form-input-sm')}
            onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
            value={inputValue}
          />
          <GitlabButton
            className={'btn-icon'}
            icon={'check-sm'}
            iconSize={16}
            onClick={() => {
              setIsEditable(false);
              setValue(inputValue);
            }}
          />
          <GitlabButton
            className={'btn-icon'}
            icon={'close'}
            iconSize={16}
            onClick={() => {
              setIsEditable(false);
              setInputValue(value);
            }}
          />
        </>
      ) : (
        <>
          <Text weight={'bold'}>{value}</Text>
          <GitlabButton
            className={'btn-icon'}
            icon={'pencil'}
            iconSize={16}
            onClick={() => setIsEditable(true)}
          />
        </>
      )}
    </Row>
  );
}
