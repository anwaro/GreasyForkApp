import './styles';
import IssuePreview from './services/IssuePreview';
import ImagePreview from './services/ImagePreview';
import CreateRelatedIssue from './services/CreateRelatedIssue';
import RelatedIssueAutocomplete from './services/RelatedIssueAutocomplete';
import ClearCacheService from './services/ClearCacheService';

[
  ClearCacheService,
  ImagePreview,
  IssuePreview,
  CreateRelatedIssue,
  RelatedIssueAutocomplete,
].forEach((Service) => new Service().init());
