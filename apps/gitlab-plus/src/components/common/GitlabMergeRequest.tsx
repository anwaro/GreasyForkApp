import { MergeRequest } from '../../types/Issue';
import { Link } from './base/Link';
import { Row } from './base/Row';
import { Text } from './base/Text';
import { GitlabUser } from './GitlabUser';
import { MrStatus } from './MrStatus';

type Props = {
  mr: MergeRequest;
};

export function GitlabMergeRequest({ mr }: Props) {
  return (
    <div style={{ marginTop: 10 }}>
      <Row gap={2}>
        <MrStatus state={mr.state} withIcon withLabel />
        <Text variant={'secondary'}>!{mr.iid}</Text>
        <GitlabUser size={16} user={mr.author} withLink />
      </Row>
      <Link href={mr.webUrl}>{mr.title}</Link>
    </div>
  );
}
