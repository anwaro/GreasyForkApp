export type IssueLinkType = {
  issue: string;
  workspacePath: string;
  projectPath: string;
};

export class IssueLink {
  static parseLink(link: string): IssueLinkType | undefined {
    if (!IssueLink.validateLink(link)) {
      return undefined;
    }
    const [projectPath, issue] = new URL(link).pathname
      .replace(/^\//, '')
      .split('/-/issues/');

    const slashCount = (projectPath.match(/\//g) || []).length;

    const workspacePath =
      slashCount === 1 ? projectPath : projectPath.replace(/\/[^/]+$/, '');

    return {
      issue: issue.replace(/\D/g, ''),
      projectPath,
      workspacePath,
    };
  }

  static validateLink(link?: string) {
    return Boolean(typeof link === 'string' && link.includes('/-/issues/'));
  }
}
