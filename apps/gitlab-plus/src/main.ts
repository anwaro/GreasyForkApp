import './styles';
import { ClearCacheService } from './services/ClearCacheService';
import { CreateChildIssue } from './services/CreateChildIssue';
import { CreateRelatedIssue } from './services/CreateRelatedIssue';
import { EpicPreview } from './services/EpicPreview';
import { ImagePreview } from './services/ImagePreview';
import { IssuePreview } from './services/IssuePreview';
import { MrPreview } from './services/MrPreview';
import { RelatedIssueAutocomplete } from './services/RelatedIssueAutocomplete';
import { SortIssue } from './services/SortIssue';

[
  ClearCacheService,
  ImagePreview,
  MrPreview,
  EpicPreview,
  IssuePreview,
  CreateRelatedIssue,
  CreateChildIssue,
  RelatedIssueAutocomplete,
  SortIssue,
].forEach((Service) => new Service().init());
