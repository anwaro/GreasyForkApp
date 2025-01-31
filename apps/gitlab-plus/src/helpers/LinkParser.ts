export type GitlabLink = {
  workspacePath: string;
};

export type GitlabIssueLink = GitlabLink & {
  issue: string;
  projectPath: string;
};

export type GitlabEpicLink = GitlabLink & {
  epic: string;
};

export class LinkParser {
  static isEpicLink(
    link: GitlabEpicLink | GitlabIssueLink | GitlabLink
  ): link is GitlabEpicLink {
    return (link as GitlabEpicLink).epic !== undefined;
  }

  static isIssueLink(
    link: GitlabEpicLink | GitlabIssueLink | GitlabLink
  ): link is GitlabIssueLink {
    return (link as GitlabIssueLink).issue !== undefined;
  }

  static parseEpicLink(link: string): GitlabEpicLink | undefined {
    if (LinkParser.validateEpicLink(link)) {
      return LinkParser.parseLink(
        link,
        /\/groups\/(?<workspacePath>.+)\/-\/epics\/(?<epic>\d+)/
      );
    }
    return undefined;
  }

  static parseIssueLink(link: string): GitlabIssueLink | undefined {
    if (LinkParser.validateIssueLink(link)) {
      return LinkParser.parseLink(
        link,
        /\/(?<projectPath>(?<workspacePath>.+)\/[^/]+)\/-\/issues\/(?<issue>\d+)/
      );
    }
    return undefined;
  }

  static parseLink<T>(link: string, pattern: RegExp): T | undefined {
    const url = new URL(link);
    const result = url.pathname.match(pattern);
    if (result && result.groups) {
      return result.groups as T;
    }
    return undefined;
  }

  static validateEpicLink(link?: string) {
    return LinkParser.validateLink(link, 'epics');
  }

  static validateIssueLink(link?: string) {
    return LinkParser.validateLink(link, 'issues');
  }

  static validateLink(link: string | undefined, type: 'epics' | 'issues') {
    return Boolean(typeof link === 'string' && link.includes(`/-/${type}/`));
  }
}
