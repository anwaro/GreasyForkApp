import { useCallback, useEffect, useState } from 'preact/hooks';

import { GitlabIssueLink } from '../../helpers/LinkParser';
import { IssueProvider } from '../../providers/IssueProvider';
import { IssueAutocomplete } from '../../types/Issue';
import { useAsyncAutocompleteOptions } from '../common/form/autocomplete/useAsyncAutocompleteOptions';

export function useRelatedIssuesAutocompleteModal(
  link: GitlabIssueLink,
  input: HTMLInputElement
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const searchIssues = useCallback(async (term: string) => {
    const response = await new IssueProvider().getIssues(
      link.workspacePath,
      term
    );

    return [
      response.data.workspace.workItems,
      response.data.workspace.workItemsByIid,
      response.data.workspace.workItemsEmpty,
    ].flatMap((item) => item?.nodes || []);
  }, []);

  const options = useAsyncAutocompleteOptions<IssueAutocomplete>(
    searchTerm,
    searchIssues
  );

  const onSelect = (item: IssueAutocomplete) => {
    input.value = `${item.project.fullPath}#${item.iid} `;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
  };

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (e.target !== input && !input.contains(e.target as Node)) {
        setIsVisible(false);
      }
    });
    input.addEventListener('click', () => setIsVisible(true));
  }, []);

  return {
    isVisible,
    onClose: () => setIsVisible(false),
    onSelect,
    options,
    searchTerm,
    setSearchTerm,
  };
}
