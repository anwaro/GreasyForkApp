import { GitlabButton } from '../common/GitlabButton';
import { ModalEvents } from '../common/modal/events';

type Props = {
  eventName: ModalEvents;
  label: string;
};

export function CreateIssueButton({ eventName, label }: Props) {
  const onClick = () => document.dispatchEvent(new CustomEvent(eventName));

  return <GitlabButton onClick={onClick}>{label}</GitlabButton>;
}
