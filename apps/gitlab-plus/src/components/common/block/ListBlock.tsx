import { ComponentChild } from 'preact';
import { Fragment } from 'preact/jsx-runtime';

import { GitlabIconNames } from '../GitlabIcon';
import { InfoBlock } from './InfoBlock';

type Props<Item> = {
  className?: string;
  icon?: GitlabIconNames;
  itemId: (item: Item) => string;
  items: Item[];
  maxHeight?: number;
  renderItem: (item: Item) => ComponentChild;
  rightTitle?: ComponentChild;
  title: string;
};

export function ListBlock<Item>({
  itemId,
  items,
  maxHeight = 100,
  renderItem,
  ...props
}: Props<Item>) {
  if (!items.length) {
    return null;
  }

  return (
    <InfoBlock contentMaxHeight={maxHeight} {...props}>
      {items.map((item) => (
        <Fragment key={itemId(item)}>{renderItem(item)}</Fragment>
      ))}
    </InfoBlock>
  );
}
