type Props = {
  onClick: () => void;
};

export function CreateIssueButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      class={'btn btn-default btn-sm gl-button'}
      type={'button'}
    >
      <span class={'gl-button-text'}>Create related issue</span>
    </button>
  );
}
