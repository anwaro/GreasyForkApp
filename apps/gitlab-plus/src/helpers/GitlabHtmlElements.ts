export class GitlabHtmlElements {
  static crudActionElement(...ids: string[]) {
    const selector = ids
      .map((s) => `${s} [data-testid="crud-actions"]`)
      .join(', ');
    return document.querySelector<HTMLDivElement>(selector);
  }
}
