import { GitlabEpicLink } from '../../helpers/LinkParser';
import { ChangeStatusSelect } from '../common/block/ChangeStatusSelect';
import { useEpicStatusSelect } from './useEpicStatusSelect';

type Props = {
  link: GitlabEpicLink;
};

export function EpicStatusSelect({ link }: Props) {
  const updateStatus = useEpicStatusSelect({ link });

  return <ChangeStatusSelect {...updateStatus} width={75} label={'Status'} />;
}
