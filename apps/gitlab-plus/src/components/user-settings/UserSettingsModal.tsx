import { Column } from '../common/base/Column';
import { Row } from '../common/base/Row';
import { Text } from '../common/base/Text';
import { GitlabBadge } from '../common/GitlabBadge';
import { GitlabSwitch } from '../common/GitlabSwitch';
import { GlpModal } from '../common/modal/GlpModal';
import { useGlpModal } from '../common/modal/useGlpModal';
import { showUserSettingsModal } from './events';
import { UserConfigForm } from './UserConfigForm';
import { useUserSettingsModal } from './useUserSettingsModal';

export function UserSettingModal() {
  const { isVisible, onClose } = useGlpModal(showUserSettingsModal);
  const { configs, services, setConfig, setServiceState } =
    useUserSettingsModal();

  return (
    <GlpModal
      isVisible={isVisible}
      onClose={onClose}
      title={
        <>
          <span style={{ color: '#e24329' }}>Gitlab Plus</span> settings
        </>
      }
    >
      <Column className={'gl-p-4'} gap={2}>
        {configs.map((config) => (
          <Row key={config.name} gap={2} items={'center'} justify={'between'}>
            <Text>{config.label}</Text>
            <UserConfigForm
              setValue={(value) => setConfig(config.name, value)}
              value={config.value}
            />
          </Row>
        ))}
        <hr class={'gl-my-2'} />
        {services.map((service) => (
          <Row gap={2} items={'center'}>
            <GitlabSwitch
              checked={service.isActive}
              disabled={service.isRequired}
              onChange={(value) => setServiceState(service.name, value)}
            />
            <Text variant={service.isRequired ? 'secondary' : undefined}>
              {service.label}
            </Text>
            {service.isExperimental && (
              <GitlabBadge label={'Experimental'} variant={'warning'} />
            )}
            {service.isRequired && (
              <GitlabBadge label={'Required'} variant={'muted'} />
            )}
          </Row>
        ))}
      </Column>
    </GlpModal>
  );
}
