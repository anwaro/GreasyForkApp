import './styles';
import { ClearCacheService } from './services/ClearCacheService';
import { CreateChildIssue } from './services/CreateChildIssue';
import { CreateRelatedIssue } from './services/CreateRelatedIssue';
import { ImagePreview } from './services/ImagePreview';
import { IssuePreview } from './services/IssuePreview';
import { RelatedIssueAutocomplete } from './services/RelatedIssueAutocomplete';
import { SortIssue } from './services/SortIssue';

[
  ClearCacheService,
  ImagePreview,
  IssuePreview,
  CreateRelatedIssue,
  CreateChildIssue,
  RelatedIssueAutocomplete,
  SortIssue,
].forEach((Service) => new Service().init());
