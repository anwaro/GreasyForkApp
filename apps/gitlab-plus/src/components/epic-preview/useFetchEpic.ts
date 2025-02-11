import { useState } from 'preact/hooks';

import { GitlabEpicLink } from '../../helpers/LinkParser';
import { EpicProvider } from '../../providers/EpicProvider';
import { Epic } from '../../types/Epic';

type EpicData = {
  epic: Epic | null;
  isLoading: boolean;
};

type RelatedEpicsData = {
  // epics: RelatedEpic[];
  isLoading: boolean;
};

const initialEpicData: EpicData = {
  epic: null,
  isLoading: false,
};

const initialRelatedEpicsData: RelatedEpicsData = {
  // epics: [],
  isLoading: false,
};

const epicProvider = new EpicProvider();

export function useFetchEpic() {
  const [epic, setEpic] = useState(initialEpicData);
  const [relatedEpics, setRelatedEpics] = useState(initialRelatedEpicsData);

  const fetchEpic = async (link: GitlabEpicLink) => {
    setEpic({ ...initialEpicData, isLoading: true });

    const response = await epicProvider.getEpic(link.workspacePath, link.epic);
    setEpic({
      epic: response.data.workspace.workItem,
      isLoading: false,
    });
  };

  const fetch = async (link: GitlabEpicLink) => {
    fetchEpic(link);
  };

  const reset = () => {
    setEpic(initialEpicData);
    setRelatedEpics(initialRelatedEpicsData);
  };

  return {
    epic,
    fetch,
    relatedEpics,
    reset,
  };
}
