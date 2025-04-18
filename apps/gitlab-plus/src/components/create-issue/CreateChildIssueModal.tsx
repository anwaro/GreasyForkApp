import { GitlabEpicLink } from '../../helpers/LinkParser';
import { ModalEvents } from '../common/modal/events';
import { GlpModal } from '../common/modal/GlpModal';
import { useGlpModal } from '../common/modal/useGlpModal';
import { CreateIssueForm } from './CreateIssueForm';

type Props = {
  link: GitlabEpicLink;
};

export function CreateChildIssueModal({ link }: Props) {
  const { isVisible, onClose } = useGlpModal(ModalEvents.showChildIssueModal);

  return (
    <GlpModal
      isVisible={isVisible}
      onClose={onClose}
      title={'Create child issue'}
    >
      <CreateIssueForm isVisible={isVisible} link={link} onClose={onClose} />
    </GlpModal>
  );
}
