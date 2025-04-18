import { useCallback, useEffect, useState } from 'preact/hooks';

import { RecentlyProvider } from '../../../providers/RecentlyProvider';
import { Label } from '../../../types/Label';

const name = 'status-labels';

export type Props = {
  getStatusLabels: () => Promise<Label[]>;
  onStausLabelUpdate: (label: Label) => Promise<void>;
  statusLabel?: Label;
};

export function useChangeStatusSelect({
  getStatusLabels,
  onStausLabelUpdate,
  statusLabel,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);

  const filterValues = useCallback(
    async (search: string) => {
      return statusLabels
        .filter((option) => option.title.includes(search))
        .filter((label) => label.id !== statusLabel?.id);
    },
    [statusLabels]
  );

  const onSelectStatus = useCallback(
    async (label: Label) => {
      setIsLoading(true);
      await onStausLabelUpdate(label);
      new RecentlyProvider(name).add(label);
      setIsLoading(false);
    },
    [onStausLabelUpdate]
  );

  useEffect(() => {
    getStatusLabels().then((labels) => setStatusLabels(labels));
  }, []);

  return {
    filterValues,
    isLoading,
    name,
    onSelectStatus,
  };
}
