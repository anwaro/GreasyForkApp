import { useMemo } from 'preact/hooks';

import { MergeRequest } from '../../../types/Mr';
import { Row } from '../../common/base/Row';
import { Text } from '../../common/base/Text';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabIcon } from '../../common/GitlabIcon';

type Props = {
  mr: MergeRequest;
};

export function MrDiff({ mr }: Props) {
  const label = useMemo(() => {
    if (mr.diffStatsSummary.fileCount === 1) {
      return '1 file';
    }
    return `${mr.diffStatsSummary.fileCount} files`;
  }, [mr.diffStatsSummary.fileCount]);

  return (
    <InfoBlock
      title={`Commit: ${mr.commitCount}`}
      rightTitle={
        <Row gap={2} items={'center'}>
          <GitlabIcon icon={'doc-code'} size={16} />
          <Text size={'subtle'} weight={'bold'}>
            {label}
          </Text>
          <Text color={'success'} weight={'bold'}>
            +{mr.diffStatsSummary.additions}
          </Text>
          <Text color={'danger'} weight={'bold'}>
            -{mr.diffStatsSummary.deletions}
          </Text>
        </Row>
      }
    />
  );
}
