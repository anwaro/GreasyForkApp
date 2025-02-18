import { ComponentChild, ComponentChildren } from 'preact';

import { clsx } from '@utils/clsx';

import { User } from '../../../types/User';
import { Row } from '../base/Row';
import { Text } from '../base/Text';
import { GitlabIcon, GitlabIconNames } from '../GitlabIcon';
import { GitlabUser } from '../GitlabUser';

type Props = {
  author: User;
  badge: ComponentChild;
  createdAt: string;
  entityId: string;
  icon: GitlabIconNames;
  onRefresh?: () => void;
  title: ComponentChildren;
};

export function HeadingBlock({
  author,
  badge,
  createdAt,
  entityId,
  icon,
  onRefresh,
  title,
}: Props) {
  return (
    <div className={'glp-block gl-relative'}>
      <Row className={''} items={'center'} justify={'between'}>
        <span
          className={clsx(
            'gl-font-bold gl-leading-20 gl-text-gray-900',
            onRefresh && 'gl-pr-5'
          )}
        >
          {title}
        </span>
        {onRefresh && (
          <div
            onClick={onRefresh}
            className={
              'gl-absolute gl-right-0 gl-top-0 gl-p-2 gl-cursor-pointer'
            }
          >
            <GitlabIcon icon={'repeat'} />
          </div>
        )}
      </Row>
      <Row className={'gl-mt-2'} gap={2} items={'center'}>
        <Row gap={2} items={'center'}>
          <GitlabIcon icon={icon} size={16} />
          <Text size={'sm'} variant={'secondary'} weight={'bold'}>
            {entityId}
          </Text>
        </Row>
        {badge}
      </Row>
      <Row className={'gl-mt-1'} gap={2} items={'center'}>
        <Text size={'sm'} variant={'secondary'}>
          Created at
        </Text>
        <Text size={'sm'} weight={'bold'}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        <Text size={'sm'} variant={'secondary'}>
          by
        </Text>
        <GitlabUser size={16} user={author} smallText withLink />
      </Row>
    </div>
  );
}
