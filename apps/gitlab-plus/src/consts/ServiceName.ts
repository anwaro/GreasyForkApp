export enum ServiceName {
  ClearCacheService = 'ClearCacheService',
  CreateChildIssue = 'CreateChildIssue',
  CreateRelatedIssue = 'CreateRelatedIssue',
  EpicPreview = 'EpicPreview',
  ImagePreview = 'ImagePreview',
  IssuePreview = 'IssuePreview',
  MrPreview = 'MrPreview',
  RelatedIssueAutocomplete = 'RelatedIssueAutocomplete',
  RelatedIssuesLabelStatus = 'RelatedIssuesLabelStatus',
  SortIssue = 'SortIssue',
  UserSettings = 'UserSettings',
}

type ServiceConfig = {
  experimental?: boolean;
  label: string;
  required?: boolean;
};

export const servicesConfig: Record<ServiceName, ServiceConfig> = {
  [ServiceName.ClearCacheService]: { label: 'Clear cache', required: true },
  [ServiceName.CreateChildIssue]: {
    label: 'Create child issue form on epic page',
  },
  [ServiceName.CreateRelatedIssue]: {
    label: 'Create related issue form on issue page',
  },
  [ServiceName.EpicPreview]: { label: 'Epic preview modal' },
  [ServiceName.ImagePreview]: { label: 'Image preview modal' },
  [ServiceName.IssuePreview]: { label: 'Issue preview modal' },
  [ServiceName.MrPreview]: { label: 'Merge request preview modal' },
  [ServiceName.RelatedIssueAutocomplete]: {
    label: 'Related issue autocomplete in related issues input',
  },
  [ServiceName.RelatedIssuesLabelStatus]: {
    label: 'Label status in related issues list items (old design)',
  },
  [ServiceName.SortIssue]: {
    experimental: true,
    label: 'Sort issues in board',
  },
  [ServiceName.UserSettings]: { label: 'User settings', required: true },
};
