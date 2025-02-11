import { useState } from 'preact/hooks';

import { GitlabMrLink } from '../../helpers/LinkParser';
import { MrProvider } from '../../providers/MrProvider';
import { MergeRequest } from '../../types/Mr';

type MrData = {
  isLoading: boolean;
  mr: MergeRequest | null;
};

const initialMrData: MrData = {
  isLoading: false,
  mr: null,
};

export function useFetchMr() {
  const [mr, setMr] = useState(initialMrData);

  const fetchMr = async (link: GitlabMrLink) => {
    setMr({ ...initialMrData, isLoading: true });

    const response = await new MrProvider().getMr(link.projectPath, link.mr);
    setMr({
      isLoading: false,
      mr: response.data.workspace.mergeRequest,
    });
  };

  const fetch = async (link: GitlabMrLink) => {
    fetchMr(link);
  };

  const reset = () => {
    setMr(initialMrData);
  };

  return {
    fetch,
    mr,
    reset,
  };
}
