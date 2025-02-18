export type GitlabLink = {
  workspacePath: string;
};

export type GitlabEpicLink = GitlabLink & {
  epic: string;
};

export type GitlabIssueLink = GitlabLink & {
  issue: string;
  projectPath: string;
};

export type GitlabMrLink = GitlabLink & {
  mr: string;
  projectPath: string;
};

type GlLink = GitlabEpicLink | GitlabIssueLink | GitlabLink | GitlabMrLink;

export class LinkParser {
  static isEpicLink(link: GlLink): link is GitlabEpicLink {
    return (link as GitlabEpicLink).epic !== undefined;
  }

  static isIssueLink(link: GlLink): link is GitlabIssueLink {
    return (link as GitlabIssueLink).issue !== undefined;
  }

  static isMrLink(link: GlLink): link is GitlabMrLink {
    return (link as GitlabMrLink).mr !== undefined;
  }

  static parseEpicLink(link: string): GitlabEpicLink | undefined {
    if (LinkParser.validateEpicLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/groups\/(?<workspacePath>.+)\/-\/epics\/(?<epic>\d+)/
      );
    }
    return undefined;
  }

  static parseGitlabLink<T>(link: string, pattern: RegExp): T | undefined {
    const url = new URL(link);
    const result = url.pathname.match(pattern);
    if (result && result.groups) {
      return result.groups as T;
    }
    return undefined;
  }

  static parseIssueLink(link: string): GitlabIssueLink | undefined {
    if (LinkParser.validateIssueLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/(?<projectPath>(?<workspacePath>.+)\/[^/]+)\/-\/issues\/(?<issue>\d+)/
      );
    }
    return undefined;
  }

  static parseMrLink(link: string): GitlabMrLink | undefined {
    if (LinkParser.validateMrLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/(?<projectPath>(?<workspacePath>.+)\/[^/]+)\/-\/merge_requests\/(?<mr>\d+)\/?$/
      );
    }
    return undefined;
  }

  static validateEpicLink(link?: string) {
    return LinkParser.validateGitlabLink(link, 'epics');
  }

  static validateGitlabLink(
    link: string | undefined,
    type: 'epics' | 'issues' | 'merge_requests'
  ) {
    return Boolean(typeof link === 'string' && link.includes(`/-/${type}/`));
  }

  static validateIssueLink(link?: string) {
    return LinkParser.validateGitlabLink(link, 'issues');
  }

  static validateMrLink(link?: string) {
    return LinkParser.validateGitlabLink(link, 'merge_requests');
  }
}
