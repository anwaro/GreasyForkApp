import { useCallback, useState } from 'preact/hooks';

import { RecentlyProvider } from '../../../providers/RecentlyProvider';
import { Label } from '../../../types/Label';

const name = 'status-labels';

export type UpdateStatus = {
  labels: Label[];
  update: (label: Label) => Promise<void>;
};

export function useLabelBlock(statusUpdate?: UpdateStatus) {
  const [isLoading, setIsLoading] = useState(false);

  const onSelectStatus = useCallback(async (label: Label) => {
    setIsLoading(true);
    if (statusUpdate) {
      await statusUpdate.update(label);
      new RecentlyProvider(name).add(label);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    name,
    onSelectStatus,
    showChangeStatusComponent: Boolean(statusUpdate),
    statusLabels: statusUpdate?.labels || [],
  };
}
