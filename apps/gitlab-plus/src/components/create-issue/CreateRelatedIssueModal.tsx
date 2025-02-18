import { GitlabIssueLink } from '../../helpers/LinkParser';
import { GlpModal } from '../common/modal/GlpModal';
import { useGlpModal } from '../common/modal/useGlpModal';
import { CreateIssueForm } from './CreateIssueForm';
import { showRelatedIssueModal } from './events';

type Props = {
  link: GitlabIssueLink;
};

export function CreateRelatedIssueModal({ link }: Props) {
  const { isVisible, onClose } = useGlpModal(showRelatedIssueModal);

  return (
    <GlpModal
      isVisible={isVisible}
      onClose={onClose}
      title={'Create related issue'}
    >
      <CreateIssueForm isVisible={isVisible} link={link} onClose={onClose} />
    </GlpModal>
  );
}
