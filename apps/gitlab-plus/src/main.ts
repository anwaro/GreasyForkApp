import './styles';
import { userSettingsStore } from './components/user-settings/UserSettingsStore';
import { ClearCacheService } from './services/ClearCacheService';
import { CreateChildIssue } from './services/CreateChildIssue';
import { CreateRelatedIssue } from './services/CreateRelatedIssue';
import { EpicPreview } from './services/EpicPreview';
import { ImagePreview } from './services/ImagePreview';
import { IssuePreview } from './services/IssuePreview';
import { MrPreview } from './services/MrPreview';
import { RelatedIssueAutocomplete } from './services/RelatedIssueAutocomplete';
import { RelatedIssuesLabelStatus } from './services/RelatedIssuesLabelStatus';
import { SortIssue } from './services/SortIssue';
import { UserSettings } from './services/UserSettings';

[
  ClearCacheService,
  ImagePreview,
  MrPreview,
  EpicPreview,
  IssuePreview,
  CreateRelatedIssue,
  CreateChildIssue,
  RelatedIssueAutocomplete,
  RelatedIssuesLabelStatus,
  SortIssue,
  UserSettings,
].forEach((Service) => {
  const service = new Service();

  if (userSettingsStore.isActive(service.name)) {
    service.init();
  }
});
