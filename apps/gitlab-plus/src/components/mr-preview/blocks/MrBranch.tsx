import { MergeRequest } from '../../../types/Mr';
import { Text } from '../../common/base/Text';
import { InfoBlock } from '../../common/bolck/InfoBlock';

type Props = {
  mr: MergeRequest;
};

export function MrBranch({ mr }: Props) {
  return (
    <InfoBlock title={'Merge'}>
      <span>
        <Text>{mr.sourceBranch}</Text>
        <Text className={'gl-mx-2'} variant={'secondary'}>
          {'in to'}
        </Text>
        <Text>{mr.targetBranch}</Text>
      </span>
    </InfoBlock>
  );
}
