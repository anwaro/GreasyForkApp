import { GitlabIssueLink } from '../../helpers/LinkParser';
import { IssueAutocomplete } from '../../types/Issue';
import { AsyncAutocompleteDropdown } from '../common/form/autocomplete/AsyncAutocompleteDropdown';
import { GitlabIcon } from '../common/GitlabIcon';
import { useRelatedIssuesAutocompleteModal } from './useRelatedIssuesAutocompleteModal';

type Props = {
  input: HTMLInputElement;
  link: GitlabIssueLink;
};

export function RelatedIssuesAutocompleteModal({ input, link }: Props) {
  const { isVisible, onClose, onSelect, options, searchTerm, setSearchTerm } =
    useRelatedIssuesAutocompleteModal(link, input);

  return isVisible ? (
    <div class={'gl-relative gl-w-full gl-new-dropdown !gl-block'}>
      <AsyncAutocompleteDropdown<IssueAutocomplete>
        hideCheckbox
        onClick={onSelect}
        onClose={onClose}
        options={options}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        value={[]}
        renderOption={(item) => (
          <div class={'gl-flex gl-gap-x-2 gl-py-2'}>
            <GitlabIcon icon={'issue-type-issue'} size={16} />
            <small>{item.iid}</small>
            <span class={'gl-flex gl-flex-wrap'}>{item.title}</span>
          </div>
        )}
      />
    </div>
  ) : null;
}
