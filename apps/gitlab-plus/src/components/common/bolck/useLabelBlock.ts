import { useCallback, useEffect, useState } from 'preact/hooks';

import { LabelsProvider } from '../../../providers/LabelsProvider';
import { RecentlyProvider } from '../../../providers/RecentlyProvider';
import { Label } from '../../../types/Label';

const name = 'status-labels';

export function useLabelBlock(
  onStatusChange?: (projectPath: string, label: Label) => Promise<void>,
  projectPath?: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusLabels, setStatusLabels] = useState<Label[]>([]);

  const onSelectStatus = useCallback(async (label: Label) => {
    setIsLoading(true);
    if (onStatusChange && projectPath) {
      await onStatusChange(projectPath, label);
      new RecentlyProvider(name).add(label);
    }
    setIsLoading(false);
  }, []);

  const fetchLabels = useCallback(async (projectPath: string) => {
    const response = await new LabelsProvider().getLabels(
      projectPath,
      'Status::'
    );
    setStatusLabels(response.data.workspace.labels.nodes);
  }, []);

  useEffect(() => {
    if (!projectPath) {
      return;
    }
    fetchLabels(projectPath);
  }, [projectPath]);

  return {
    isLoading,
    name,
    onSelectStatus,
    showChangeStatusComponent: Boolean(projectPath && onStatusChange),
    statusLabels,
  };
}
