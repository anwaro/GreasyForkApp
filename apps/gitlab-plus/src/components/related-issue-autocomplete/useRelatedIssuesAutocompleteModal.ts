import { useEffect, useState } from 'preact/hooks';

import { IssueLinkType } from '../../helpers/IssueLink';
import { IssueProvider } from '../../providers/IssueProvider';
import { IssueAutocomplete } from '../../types/Issue';
import { useAsyncAutocompleteOptions } from '../common/form/autocomplete/useAsyncAutocompleteOptions';

export function useRelatedIssuesAutocompleteModal(
  link: IssueLinkType,
  input: HTMLInputElement
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const options = useAsyncAutocompleteOptions<IssueAutocomplete>(
    searchTerm,
    async (term: string) => {
      const response = await new IssueProvider().getIssues(
        link.workspacePath,
        term
      );

      return [
        response.data.workspace.workItems,
        response.data.workspace.workItemsByIid,
        response.data.workspace.workItemsEmpty,
      ].flatMap((item) => item?.nodes || []);
    }
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
