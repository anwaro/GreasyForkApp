import { useMemo, useState } from 'preact/hooks';

import { ServiceName, servicesConfig } from '../../services/ServiceName';
import { configLabels, UserConfig } from './UserConfig';
import { userSettingsStore } from './UserSettingsStore';

export function useUserSettingsModal() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const services = useMemo(() => {
    return Object.entries(servicesConfig)
      .map(([name, config]) => ({
        isActive: Boolean(userSettingsStore.isActive(name as ServiceName)),
        isExperimental: config.experimental,
        isRequired: config.required,
        label: config.label,
        name: name as ServiceName,
      }))
      .sort((a, b) => {
        if (a.isRequired || b.isRequired) {
          return a.isRequired ? 1 : -1;
        }
        if (a.isExperimental || b.isExperimental) {
          return a.isExperimental ? 1 : -1;
        }
        return a.name.localeCompare(b.name);
      });
  }, [refreshFlag]);

  const configs = useMemo(() => {
    return Object.values<UserConfig>(UserConfig).map((name) => ({
      label: configLabels[name],
      name,
      value: userSettingsStore.getConfig(name),
    }));
  }, [refreshFlag]);

  return {
    configs,
    services,
    setConfig: (name: UserConfig, value: string) => {
      userSettingsStore.setConfig(name, value);
      setRefreshFlag((flag) => !flag);
    },
    setServiceState: (name: ServiceName, value: boolean) => {
      userSettingsStore.setIsActive(name, value);
      setRefreshFlag((flag) => !flag);
    },
  };
}
