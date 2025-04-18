import { GitlabIssueLink } from '../../helpers/LinkParser';
import { ChangeStatusSelect } from '../common/block/ChangeStatusSelect';
import { useIssueStatusSelect } from './useIssueStatusSelect';

type Props = {
  link: GitlabIssueLink;
};

export function IssueStatusSelect({ link }: Props) {
  const updateStatus = useIssueStatusSelect({ link });
 
  return <ChangeStatusSelect {...updateStatus} width={75} label={'Status'} />;
}
