export enum UserConfig {
  StatusLabelPrefix = 'StatusLabelPrefix',
}

export type UserConfigType = Record<UserConfig, string>;
export const configLabels: Record<UserConfig, string> = {
  [UserConfig.StatusLabelPrefix]: 'Status label prefix',
};

export const defaultUserConfig: UserConfigType = {
  [UserConfig.StatusLabelPrefix]: 'Status::',
};
