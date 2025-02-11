import { ComponentChild } from 'preact';

import { User } from '../../../types/User';
import { Row } from '../base/Row';
import { Text } from '../base/Text';
import { GitlabIcon, GitlabIconNames } from '../GitlabIcon';
import { GitlabUser } from '../GitlabUser';
import { InfoBlock } from './InfoBlock';

type Props = {
  author: User;
  badge: ComponentChild;
  createdAt: string;
  entityId: string;
  icon: GitlabIconNames;
  title: string;
};

export function HeadingBlock({
  author,
  badge,
  createdAt,
  entityId,
  icon,
  title,
}: Props) {
  return (
    <>
      <Row className={'-gl-mb-2 gl-mt-4'} items={'center'} justify={'between'}>
        {badge}
        <Text size={'sm'} variant={'secondary'}>
          created at {new Date(createdAt).toLocaleDateString()}
        </Text>
      </Row>
      <InfoBlock title={title}>
        <Row className={'gl-mt-1'} items={'center'} justify={'between'}>
          <Row items={'center'}>
            <GitlabIcon icon={icon} size={16} />
            <Text className={'gl-ml-2'} size={'sm'} variant={'secondary'}>
              {entityId}
            </Text>
          </Row>
          <Row items={'center'}>
            <Text className={'gl-mr-2'} size={'sm'} variant={'secondary'}>
              created by
            </Text>
            <GitlabUser size={16} user={author} smallText withLink />
          </Row>
        </Row>
      </InfoBlock>
    </>
  );
}
