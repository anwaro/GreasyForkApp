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
  static epicPattern(strict = false) {
    return LinkParser.patternGroup('epic', 'epics', strict);
  }

  static isEpicLink(link: GlLink): link is GitlabEpicLink {
    return (link as GitlabEpicLink).epic !== undefined;
  }

  static isIssueLink(link: GlLink): link is GitlabIssueLink {
    return (link as GitlabIssueLink).issue !== undefined;
  }

  static isMrLink(link: GlLink): link is GitlabMrLink {
    return (link as GitlabMrLink).mr !== undefined;
  }

  static issuePattern(strict = false) {
    return LinkParser.patternProject('issue', 'issues', strict);
  }

  static mrPattern(strict = false) {
    return LinkParser.patternProject('mr', 'merge_requests', strict);
  }

  static parseEpicLink(
    link: string,
    strict = false
  ): GitlabEpicLink | undefined {
    if (LinkParser.validateEpicLink(link, strict)) {
      return LinkParser.parseGitlabLink(link, LinkParser.epicPattern(strict));
    }
    return undefined;
  }

  static parseGitlabLink<T>(link: string, pattern: RegExp): T | undefined {
    const result = new URL(link).pathname.match(pattern);
    if (result && result.groups) {
      return result.groups as T;
    }
    return undefined;
  }

  static parseIssueLink(
    link: string,
    strict = false
  ): GitlabIssueLink | undefined {
    if (LinkParser.validateIssueLink(link)) {
      return LinkParser.parseGitlabLink(link, LinkParser.issuePattern(strict));
    }
    return undefined;
  }

  static parseMrLink(link: string, strict = false): GitlabMrLink | undefined {
    if (LinkParser.validateMrLink(link)) {
      return LinkParser.parseGitlabLink(link, LinkParser.mrPattern(strict));
    }
    return undefined;
  }

  static patternGroup(name: string, entity: string, strict: boolean) {
    const end = !strict ? '([?#]{1}.*)?' : '';
    return new RegExp(
      `\\/groups\\/(?<workspacePath>.+)\\/-\\/${entity}\\/(?<${name}>\\d+)\\/?${end}$`
    );
  }

  static patternProject(name: string, entity: string, strict: boolean) {
    const end = !strict ? '([?#]{1}.*)?' : '';
    return new RegExp(
      `\\/(?<projectPath>(?<workspacePath>.+)\\/[^/]+)\\/-\\/${entity}\\/(?<${name}>\\d+)\\/?${end}$`
    );
  }

  static validateEpicLink(link?: string, strict = false) {
    return LinkParser.validateGitlabLink(link, LinkParser.epicPattern(strict));
  }

  static validateGitlabLink(link: string | undefined, pattern: RegExp) {
    return Boolean(typeof link === 'string' && pattern.test(link));
  }

  static validateIssueLink(link?: string, strict = false) {
    return LinkParser.validateGitlabLink(link, LinkParser.issuePattern(strict));
  }

  static validateMrLink(link?: string, strict = false) {
    return LinkParser.validateGitlabLink(link, LinkParser.mrPattern(strict));
  }
}
